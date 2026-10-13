-- ====================================================================
-- 智慧圖書館管理系統 (Smart Library OS) - 一鍵完整安裝 (DDL + Seed Data)
-- 直接在 MySQL Workbench / phpMyAdmin / HeidiSQL 中全文執行即可
-- ====================================================================

-- 1. 建立與切換資料庫
CREATE DATABASE IF NOT EXISTS `smart_library` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `smart_library`;

-- 2. 清理舊表格（依照依賴順序）
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `seat_reservations`;
DROP TABLE IF EXISTS `seats`;
DROP TABLE IF EXISTS `loans`;
DROP TABLE IF EXISTS `books`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `members`;
DROP TABLE IF EXISTS `member_types`;

SET FOREIGN_KEY_CHECKS = 1;

-- ====================================================================
-- 表 1：member_types (讀者身分等級規則表)
-- ====================================================================
CREATE TABLE `member_types` (
    `type_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '身分等級唯一ID',
    `type_name` VARCHAR(20) NOT NULL UNIQUE COMMENT '身分名稱 (學生/教職員/一般讀者)',
    `max_borrow_limit` INT NOT NULL DEFAULT 5 COMMENT '最大可借閱冊數',
    `max_loan_days` INT NOT NULL DEFAULT 14 COMMENT '最長借閱天數',
    `max_seat_hours` INT NOT NULL DEFAULT 4 COMMENT '單次自習室座位預約上限時數',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='讀者身分規則表';

-- ====================================================================
-- 表 2：members (讀者會員主表)
-- ====================================================================
CREATE TABLE `members` (
    `member_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '讀者證號 (如 MEM-2001)',
    `type_id` INT NOT NULL COMMENT '所屬身分等級ID (關聯 member_types)',
    `name` VARCHAR(50) NOT NULL COMMENT '讀者姓名',
    `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '電子郵件',
    `phone` VARCHAR(20) NULL COMMENT '聯絡電話',
    `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active' COMMENT '帳號狀態',
    `joined_date` DATE NOT NULL COMMENT '入會/辦證日期',
    `notes` VARCHAR(255) NULL COMMENT '身分別備註',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    CONSTRAINT `fk_members_type` FOREIGN KEY (`type_id`) 
        REFERENCES `member_types` (`type_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='讀者會員主表';

-- ====================================================================
-- 表 3：categories (圖書分類表)
-- ====================================================================
CREATE TABLE `categories` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '分類唯一ID',
    `category_name` VARCHAR(50) NOT NULL UNIQUE COMMENT '分類名稱',
    `code` VARCHAR(20) NOT NULL UNIQUE COMMENT '分類代碼',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='圖書分類表';

-- ====================================================================
-- 表 4：books (館藏圖書主表)
-- ====================================================================
CREATE TABLE `books` (
    `book_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '館藏編號 (如 BK-1001)',
    `isbn` VARCHAR(20) NOT NULL UNIQUE COMMENT '國際標準書號 (ISBN)',
    `title` VARCHAR(200) NOT NULL COMMENT '書籍標題',
    `author` VARCHAR(100) NOT NULL COMMENT '作者',
    `publisher` VARCHAR(100) NULL COMMENT '出版社',
    `category_id` INT NOT NULL COMMENT '分類ID (關聯 categories)',
    `publish_year` INT NULL COMMENT '出版年份',
    `location` VARCHAR(50) NULL COMMENT '實體館藏架位',
    `total_copies` INT NOT NULL DEFAULT 1 COMMENT '館藏總冊數',
    `available_copies` INT NOT NULL DEFAULT 1 COMMENT '在架可借冊數',
    `cover_color` VARCHAR(20) DEFAULT '#3b82f6' COMMENT '卡片代表色彩',
    `description` TEXT NULL COMMENT '內容簡介',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建檔時間',
    CONSTRAINT `fk_books_category` FOREIGN KEY (`category_id`) 
        REFERENCES `categories` (`category_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `chk_book_copies` CHECK (`available_copies` >= 0 AND `available_copies` <= `total_copies`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='館藏圖書主表';

-- ====================================================================
-- 表 5：loans (借還書流通明細表記錄)
-- ====================================================================
CREATE TABLE `loans` (
    `loan_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '借閱流通單號 (如 LN-3001)',
    `book_id` VARCHAR(20) NOT NULL COMMENT '借出書籍ID',
    `member_id` VARCHAR(20) NOT NULL COMMENT '借閱讀者證號',
    `borrow_date` DATE NOT NULL COMMENT '借出日期',
    `due_date` DATE NOT NULL COMMENT '應還日期',
    `return_date` DATE NULL COMMENT '實際歸還日期',
    `status` ENUM('borrowed', 'returned', 'overdue') NOT NULL DEFAULT 'borrowed' COMMENT '流通狀態',
    `renew_count` INT NOT NULL DEFAULT 0 COMMENT '已續借次數',
    `fine_amount` DECIMAL(8, 2) NOT NULL DEFAULT 0.00 COMMENT '累積滯納金',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    CONSTRAINT `fk_loans_book` FOREIGN KEY (`book_id`) 
        REFERENCES `books` (`book_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_loans_member` FOREIGN KEY (`member_id`) 
        REFERENCES `members` (`member_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='圖書借還紀錄表';

CREATE INDEX `idx_loans_status` ON `loans` (`status`);
CREATE INDEX `idx_loans_member` ON `loans` (`member_id`);
CREATE INDEX `idx_loans_book` ON `loans` (`book_id`);

-- ====================================================================
-- 表 6：seats (自習室座位主檔表)
-- ====================================================================
CREATE TABLE `seats` (
    `seat_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '座位唯一標號 (如 SEAT-A01)',
    `seat_number` VARCHAR(20) NOT NULL COMMENT '座位顯示號碼',
    `zone_name` VARCHAR(50) NOT NULL COMMENT '空間分區',
    `seat_type` VARCHAR(50) NOT NULL COMMENT '席位類型',
    `features` VARCHAR(255) NULL COMMENT '配備特色',
    `status` ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available' COMMENT '即時狀態',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='自習室座位表';

-- ====================================================================
-- 表 7：seat_reservations (自習座位預約明細表)
-- ====================================================================
CREATE TABLE `seat_reservations` (
    `reservation_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '預約代號 (如 RES-4001)',
    `seat_id` VARCHAR(20) NOT NULL COMMENT '預約座位ID',
    `member_id` VARCHAR(20) NOT NULL COMMENT '預約讀者證號',
    `reserve_date` DATE NOT NULL COMMENT '預約日期',
    `start_time` TIME NOT NULL COMMENT '開始時段',
    `end_time` TIME NOT NULL COMMENT '結束時段',
    `duration_hours` INT NOT NULL COMMENT '使用時數',
    `status` ENUM('reserved', 'checked_in', 'completed', 'cancelled') NOT NULL DEFAULT 'reserved' COMMENT '預約狀態',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '預約建立時間',
    CONSTRAINT `fk_reservations_seat` FOREIGN KEY (`seat_id`) 
        REFERENCES `seats` (`seat_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_reservations_member` FOREIGN KEY (`member_id`) 
        REFERENCES `members` (`member_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='自習座位預約表';

CREATE INDEX `idx_res_seat_date_time` ON `seat_reservations` (`seat_id`, `reserve_date`, `start_time`, `end_time`);
CREATE INDEX `idx_res_member_date` ON `seat_reservations` (`member_id`, `reserve_date`);

-- ====================================================================
-- 3. 匯入基礎初始資料 (Data Seeding)
-- ====================================================================

-- 讀者身分等級
INSERT INTO `member_types` (`type_id`, `type_name`, `max_borrow_limit`, `max_loan_days`, `max_seat_hours`) VALUES
(1, '學生', 5, 14, 4),
(2, '教職員', 10, 30, 8),
(3, '一般讀者', 3, 7, 2);

-- 讀者會員
INSERT INTO `members` (`member_id`, `type_id`, `name`, `email`, `phone`, `status`, `joined_date`, `notes`) VALUES
('MEM-2001', 1, '陳思妤', 'sychen@university.edu.tw', '0912-345-678', 'active', '2025-09-01', '資工系二年級'),
('MEM-2002', 2, '林浩然', 'hrlin@university.edu.tw', '0923-456-789', 'active', '2024-03-10', '圖書資訊處助理教授'),
('MEM-2003', 1, '張雅筑', 'ycchang@university.edu.tw', '0934-567-890', 'active', '2025-10-12', '外文系三年級'),
('MEM-2004', 3, '黃國豪', 'guohao.huang@gmail.com', '0956-789-012', 'active', '2026-01-05', '社區居民證'),
('MEM-2005', 1, '李欣穎', 'hsinying.lee@university.edu.tw', '0967-890-123', 'active', '2026-02-20', '企管系一年級');

-- 圖書分類
INSERT INTO `categories` (`category_id`, `category_name`, `code`) VALUES
(1, '心理勵志', 'PSY'),
(2, '資訊科技', 'TECH'),
(3, '人文歷史', 'HIST'),
(4, '商業理財', 'BIZ'),
(5, '文學小說', 'LIT');

-- 館藏圖書
INSERT INTO `books` (`book_id`, `isbn`, `title`, `author`, `publisher`, `category_id`, `publish_year`, `location`, `total_copies`, `available_copies`, `cover_color`, `description`) VALUES
('BK-1001', '9789861755267', '原子習慣：細微改變帶來巨大成就的實證法則', '詹姆斯·克利爾 (James Clear)', '方智出版', 1, 2019, 'A區-02架', 5, 5, '#f97316', '每天進步1%，一年後你會進步37倍；每天退步1%，一年後你會弱化到趨近於0！'),
('BK-1002', '9789861364018', '被討厭的勇氣：自我啟發之父「阿德勒」的教導', '岸見一郎, 古賀史健', '究竟出版', 1, 2014, 'A區-03架', 4, 2, '#3b82f6', '所謂的自由，就是被別人討厭。阿德勒心理學給予現代人勇氣與生命解答。'),
('BK-1003', '9789862017050', 'Clean Code：無瑕的程式碼 － 敏捷軟體開發技巧守則', 'Robert C. Martin', '博碩文化', 2, 2013, 'B區-01架', 3, 2, '#10b981', '軟體品質的衡量標準只有一個：那就是在閱讀程式碼時，每分鐘發出『WTF』的次數。'),
('BK-1004', '9789865022136', '深入淺出設計模式 (Head First Design Patterns)', 'Eric Freeman, Elisabeth Robson', '歐萊禮 (O''Reilly)', 2, 2021, 'B區-01架', 3, 3, '#8b5cf6', '以神經生物學與認知科學為基礎，幫你快速掌握物件導向設計原則與模式。'),
('BK-1005', '9789863205449', '人類大歷史：從野獸到扮演上帝', '哈拉瑞 (Yuval Noah Harari)', '天下文化', 3, 2014, 'C區-04架', 4, 3, '#eab308', '十萬年前，地球上至少有六個人種；為什麼今天只剩我們智人統治世界？'),
('BK-1006', '9789862415931', '快思慢想 (Thinking, Fast and Slow)', '康納曼 (Daniel Kahneman)', '天下文化', 4, 2012, 'C區-02架', 3, 3, '#ec4899', '諾貝爾經濟學獎得主畢生研究精華，徹底翻轉人類對思考、決策與判斷的認知。'),
('BK-1007', '9789573330127', '解憂雜貨店', '東野圭吾', '皇冠文化', 5, 2013, 'D區-01架', 6, 5, '#06b6d4', '僻靜的街道旁有一家雜貨店，只要寫下煩惱投進鐵捲門投信口，隔天就會在牛奶箱裡得到回答。'),
('BK-1008', '9789864344567', '資料結構與演算法圖解（Python 實現）', 'Aditya Bhargava', '博碩文化', 2, 2020, 'B區-02架', 4, 4, '#6366f1', '全彩圖解生動演繹常見資料結構與演算法，讓抽象觀念一目了然！');

-- 借還書流通明細
INSERT INTO `loans` (`loan_id`, `book_id`, `member_id`, `borrow_date`, `due_date`, `return_date`, `status`, `renew_count`, `fine_amount`) VALUES
('LN-3001', 'BK-1001', 'MEM-2001', '2026-09-01', '2026-09-15', '2026-09-15', 'returned', 0, 0.00),
('LN-3002', 'BK-1002', 'MEM-2002', '2026-08-20', '2026-09-03', NULL, 'overdue', 0, 95.00),
('LN-3003', 'BK-1003', 'MEM-2003', '2026-09-10', '2026-09-24', NULL, 'borrowed', 0, 0.00),
('LN-3004', 'BK-1005', 'MEM-2004', '2026-09-08', '2026-09-22', NULL, 'borrowed', 0, 0.00),
('LN-3005', 'BK-1007', 'MEM-2001', '2026-08-10', '2026-08-24', '2026-08-20', 'returned', 0, 0.00),
('LN-3006', 'BK-1004', 'MEM-2005', '2026-09-15', '2026-10-13', '2026-09-15', 'returned', 1, 0.00),
('LN-3007', 'BK-1004', 'MEM-2005', '2026-09-15', '2026-09-29', '2026-09-15', 'returned', 0, 0.00),
('LN-3008', 'BK-1002', 'MEM-2001', '2026-09-15', '2026-10-13', NULL, 'borrowed', 1, 0.00);

-- 自習室座位主檔
INSERT INTO `seats` (`seat_id`, `seat_number`, `zone_name`, `seat_type`, `features`, `status`) VALUES
('SEAT-A01', 'A-01', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈, 靜音區', 'available'),
('SEAT-A02', 'A-02', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈, 靠窗景觀', 'available'),
('SEAT-A03', 'A-03', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈, 靜音區', 'occupied'),
('SEAT-A04', 'A-04', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈, 靠窗景觀', 'occupied'),
('SEAT-A05', 'A-05', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈', 'available'),
('SEAT-A06', 'A-06', '靜音自習區', '個人自習席', '電源插座, 獨立檯燈', 'available'),
('SEAT-B01', 'B-01', '電腦檢索區', '雙螢幕電腦席', '高階主機, 雙螢幕, 電子資源檢索', 'occupied'),
('SEAT-B02', 'B-02', '電腦檢索區', '雙螢幕電腦席', '高階主機, 雙螢幕, 電子資源檢索', 'available'),
('SEAT-B03', 'B-03', '電腦檢索區', '論文編修席', '雙螢幕, 統計軟體SPSS/Python, 專業鍵盤', 'available'),
('SEAT-B04', 'B-04', '電腦檢索區', '論文編修席', '雙螢幕, 電子資料庫, 掃描設備', 'available'),
('SEAT-C01', 'C-01 研討室', '研討與多功能區', '小組研討室 (4-6人)', '65吋投影螢幕, 白板, 隔音討論空間', 'available'),
('SEAT-C02', 'C-02 研討室', '研討與多功能區', '大型會議研討室 (8-12人)', '4K視訊會議設備, 電子白板, 音響擴音系統', 'available');

-- 自習座位預約明細
INSERT INTO `seat_reservations` (`reservation_id`, `seat_id`, `member_id`, `reserve_date`, `start_time`, `end_time`, `duration_hours`, `status`, `created_at`) VALUES
('RES-4001', 'SEAT-A02', 'MEM-2001', '2026-09-15', '09:00:00', '13:00:00', 4, 'completed', '2026-09-15 08:45:00'),
('RES-4002', 'SEAT-A03', 'MEM-2002', '2026-09-15', '14:00:00', '18:00:00', 4, 'checked_in', '2026-09-15 09:10:00'),
('RES-4003', 'SEAT-B01', 'MEM-2003', '2026-09-15', '10:00:00', '12:00:00', 2, 'checked_in', '2026-09-15 09:50:00'),
('RES-4004', 'SEAT-A01', 'MEM-2004', '2026-09-15', '08:00:00', '10:00:00', 2, 'completed', '2026-09-15 07:55:00'),
('RES-4005', 'SEAT-A04', 'MEM-2005', '2026-09-15', '15:00:00', '17:00:00', 2, 'completed', '2026-09-15 11:07:00'),
('RES-4006', 'SEAT-A04', 'MEM-2002', '2026-09-15', '19:00:00', '21:00:00', 2, 'checked_in', '2026-09-15 11:49:00');
