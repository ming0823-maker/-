-- ====================================================================
-- 智慧圖書館管理系統 (Smart Library OS) - MySQL 資料庫綱要 (DDL)
-- 資料庫版本：MySQL 8.0+ / MariaDB 10.4+
-- 字元編碼：utf8mb4 / 排序規則：utf8mb4_unicode_ci
-- 表格總數：7 張核心資料表 (完全符合 3NF 第三正規化)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `smart_library` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `smart_library`;

-- 1. 禁用外鍵檢查以便安全重建表格
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
-- 用途：規範不同身分等級（學生、教職員、一般讀者）之借書額度、天數與座位預約時數
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
-- 表 2：members (讀者會員資料主表)
-- 用途：儲存圖書館會員讀者個人資料與狀態
-- ====================================================================
CREATE TABLE `members` (
    `member_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '讀者證號 (如 MEM-2001)',
    `type_id` INT NOT NULL COMMENT '所屬身分等級ID (關聯 member_types)',
    `name` VARCHAR(50) NOT NULL COMMENT '讀者姓名',
    `email` VARCHAR(100) NOT NULL UNIQUE COMMENT '電子郵件',
    `phone` VARCHAR(20) NULL COMMENT '聯絡電話',
    `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active' COMMENT '帳號狀態 (active:正常, suspended:停權)',
    `joined_date` DATE NOT NULL COMMENT '入會/辦證日期',
    `notes` VARCHAR(255) NULL COMMENT '身分別備註 (如 資工系二年級)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    CONSTRAINT `fk_members_type` FOREIGN KEY (`type_id`) 
        REFERENCES `member_types` (`type_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='讀者會員主表';

-- ====================================================================
-- 表 3：categories (圖書分類表)
-- 用途：書籍分類主檔（正規化解開圖書分類文字）
-- ====================================================================
CREATE TABLE `categories` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '分類唯一ID',
    `category_name` VARCHAR(50) NOT NULL UNIQUE COMMENT '分類名稱 (如 資訊科技/文學小說)',
    `code` VARCHAR(20) NOT NULL UNIQUE COMMENT '分類代碼 (如 TECH/LIT/PSY)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='圖書分類表';

-- ====================================================================
-- 表 4：books (館藏圖書主表)
-- 用途：儲存全館圖書基本資料、架位與即時在庫數量
-- ====================================================================
CREATE TABLE `books` (
    `book_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '館藏索書號/編號 (如 BK-1001)',
    `isbn` VARCHAR(20) NOT NULL UNIQUE COMMENT '國際標準書號 (ISBN)',
    `title` VARCHAR(200) NOT NULL COMMENT '書籍標題',
    `author` VARCHAR(100) NOT NULL COMMENT '作者',
    `publisher` VARCHAR(100) NULL COMMENT '出版社',
    `category_id` INT NOT NULL COMMENT '分類ID (關聯 categories)',
    `publish_year` INT NULL COMMENT '出版年份',
    `location` VARCHAR(50) NULL COMMENT '實體館藏架位 (如 A區-02架)',
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
-- 表 5：loans (借還書流通明細表 - 多對多交易表記錄)
-- 用途：記錄會員讀者與館藏書籍之借閱歷程、歸還時間、續借次數與滯納金
-- ====================================================================
CREATE TABLE `loans` (
    `loan_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '借閱流通單號 (如 LN-3001)',
    `book_id` VARCHAR(20) NOT NULL COMMENT '借出書籍ID (關聯 books)',
    `member_id` VARCHAR(20) NOT NULL COMMENT '借閱讀者證號 (關聯 members)',
    `borrow_date` DATE NOT NULL COMMENT '借出日期',
    `due_date` DATE NOT NULL COMMENT '應還日期',
    `return_date` DATE NULL COMMENT '實際歸還日期 (NULL表示借閱中)',
    `status` ENUM('borrowed', 'returned', 'overdue') NOT NULL DEFAULT 'borrowed' COMMENT '狀態 (borrowed:借出, returned:已還, overdue:逾期)',
    `renew_count` INT NOT NULL DEFAULT 0 COMMENT '已續借次數',
    `fine_amount` DECIMAL(8, 2) NOT NULL DEFAULT 0.00 COMMENT '累積滯納金(元)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    CONSTRAINT `fk_loans_book` FOREIGN KEY (`book_id`) 
        REFERENCES `books` (`book_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_loans_member` FOREIGN KEY (`member_id`) 
        REFERENCES `members` (`member_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='圖書借還紀錄表';

-- 為借閱記錄建立高頻查詢索引
CREATE INDEX `idx_loans_status` ON `loans` (`status`);
CREATE INDEX `idx_loans_member` ON `loans` (`member_id`);
CREATE INDEX `idx_loans_book` ON `loans` (`book_id`);

-- ====================================================================
-- 表 6：seats (自習室座位主檔表)
-- 用途：儲存圖書館各分區之自習座位配置與設備規格
-- ====================================================================
CREATE TABLE `seats` (
    `seat_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '座位唯一標號 (如 SEAT-A01)',
    `seat_number` VARCHAR(20) NOT NULL COMMENT '座位顯示號碼 (如 A-01, C-01 研討室)',
    `zone_name` VARCHAR(50) NOT NULL COMMENT '空間分區 (靜音自習區/電腦檢索區/研討與多功能區)',
    `seat_type` VARCHAR(50) NOT NULL COMMENT '席位類型 (個人自習席/雙螢幕電腦席/研討室)',
    `features` VARCHAR(255) NULL COMMENT '配備特色 (電源插座, 檯燈, 雙螢幕等)',
    `status` ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available' COMMENT '即時狀態',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='自習室座位表';

-- ====================================================================
-- 表 7：seat_reservations (自習座位預約明細表 - 多對多時段交易表)
-- 用途：記錄讀者預約自習座位、時段、簽到報到、提前釋放與取消歷程
-- ====================================================================
CREATE TABLE `seat_reservations` (
    `reservation_id` VARCHAR(20) NOT NULL PRIMARY KEY COMMENT '預約代號 (如 RES-4001)',
    `seat_id` VARCHAR(20) NOT NULL COMMENT '預約座位ID (關聯 seats)',
    `member_id` VARCHAR(20) NOT NULL COMMENT '預約讀者證號 (關聯 members)',
    `reserve_date` DATE NOT NULL COMMENT '預約日期',
    `start_time` TIME NOT NULL COMMENT '開始時段',
    `end_time` TIME NOT NULL COMMENT '結束時段',
    `duration_hours` INT NOT NULL COMMENT '使用時數',
    `status` ENUM('reserved', 'checked_in', 'completed', 'cancelled') NOT NULL DEFAULT 'reserved' COMMENT '預約狀態 (reserved:已預約, checked_in:已簽到, completed:已釋放/完成, cancelled:已取消)',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '預約建立時間',
    CONSTRAINT `fk_reservations_seat` FOREIGN KEY (`seat_id`) 
        REFERENCES `seats` (`seat_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_reservations_member` FOREIGN KEY (`member_id`) 
        REFERENCES `members` (`member_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='自習座位預約表';

-- 為時段防重疊衝突檢索建立複合索引
CREATE INDEX `idx_res_seat_date_time` ON `seat_reservations` (`seat_id`, `reserve_date`, `start_time`, `end_time`);
CREATE INDEX `idx_res_member_date` ON `seat_reservations` (`member_id`, `reserve_date`);
