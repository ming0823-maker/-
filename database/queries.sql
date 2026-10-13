-- ====================================================================
-- 智慧圖書館管理系統 (Smart Library OS) - 常用業務進階 SQL 查詢範例
-- 包含：多表關聯 (JOIN)、統計聚合 (GROUP BY)、子查詢 (Subquery) 與條件篩選
-- 適合：課堂專案展示、功能測試、報表統計
-- ====================================================================

USE `smart_library`;

-- --------------------------------------------------------------------
-- 查詢 1：查詢目前所有「借閱中」或「逾期」的書籍明細（三表關聯：借閱表 + 讀者表 + 書籍表）
-- --------------------------------------------------------------------
SELECT 
    l.loan_id AS '借閱單號',
    b.title AS '書名',
    b.isbn AS 'ISBN',
    m.name AS '借閱人',
    mt.type_name AS '身分別',
    m.phone AS '聯絡電話',
    l.borrow_date AS '借出日期',
    l.due_date AS '應還日期',
    l.status AS '狀態',
    l.fine_amount AS '滯納金(元)'
FROM loans l
INNER JOIN books b ON l.book_id = b.book_id
INNER JOIN members m ON l.member_id = m.member_id
INNER JOIN member_types mt ON m.type_id = mt.type_id
WHERE l.status IN ('borrowed', 'overdue')
ORDER BY l.due_date ASC;

-- --------------------------------------------------------------------
-- 查詢 2：讀者個人借閱額度與使用狀況統計（計算當前借閱本數 vs 最大上限）
-- --------------------------------------------------------------------
SELECT 
    m.member_id AS '讀者證號',
    m.name AS '姓名',
    mt.type_name AS '身分',
    mt.max_borrow_limit AS '借閱上限',
    COUNT(CASE WHEN l.status IN ('borrowed', 'overdue') THEN 1 END) AS '目前借閱本數',
    (mt.max_borrow_limit - COUNT(CASE WHEN l.status IN ('borrowed', 'overdue') THEN 1 END)) AS '剩餘可借額度',
    m.status AS '證件狀態'
FROM members m
INNER JOIN member_types mt ON m.type_id = mt.type_id
LEFT JOIN loans l ON m.member_id = l.member_id
GROUP BY m.member_id, m.name, mt.type_name, mt.max_borrow_limit, m.status;

-- --------------------------------------------------------------------
-- 查詢 3：各類別藏書量與流通借出比例統計（用於儀表板圓餅圖/長條圖）
-- --------------------------------------------------------------------
SELECT 
    c.category_name AS '圖書分類',
    COUNT(b.book_id) AS '書籍種數',
    SUM(b.total_copies) AS '館藏總冊數',
    SUM(b.available_copies) AS '在庫可借冊數',
    (SUM(b.total_copies) - SUM(b.available_copies)) AS '流通借出冊數',
    ROUND(((SUM(b.total_copies) - SUM(b.available_copies)) / SUM(b.total_copies)) * 100, 1) AS '借出率(%)'
FROM categories c
LEFT JOIN books b ON c.category_id = b.category_id
GROUP BY c.category_id, c.category_name
ORDER BY 流通借出冊數 DESC;

-- --------------------------------------------------------------------
-- 查詢 4：自習室座位今日使用與預約狀況查詢（含預約人資訊）
-- --------------------------------------------------------------------
SELECT 
    s.seat_number AS '座位編號',
    s.zone_name AS '所屬分區',
    s.seat_type AS '席位型態',
    s.status AS '座位狀態',
    r.reservation_id AS '預約代號',
    m.name AS '預約讀者',
    r.start_time AS '開始時間',
    r.end_time AS '結束時間',
    r.status AS '預約狀態'
FROM seats s
LEFT JOIN seat_reservations r 
    ON s.seat_id = r.seat_id 
    AND r.reserve_date = '2026-09-15'
    AND r.status IN ('reserved', 'checked_in')
LEFT JOIN members m ON r.member_id = m.member_id
ORDER BY s.zone_name, s.seat_number;

-- --------------------------------------------------------------------
-- 查詢 5：各分區自習室熱門度與預約使用總時數排行
-- --------------------------------------------------------------------
SELECT 
    s.zone_name AS '分區名稱',
    COUNT(r.reservation_id) AS '總預約人次',
    COALESCE(SUM(r.duration_hours), 0) AS '累計使用時數',
    ROUND(AVG(r.duration_hours), 1) AS '平均使用時長(小時)'
FROM seats s
LEFT JOIN seat_reservations r ON s.seat_id = r.seat_id
GROUP BY s.zone_name
ORDER BY 累計使用時數 DESC;

-- --------------------------------------------------------------------
-- 查詢 6：逾期未還讀者催還與滯納金總覽（逾期警示報表）
-- --------------------------------------------------------------------
SELECT 
    m.member_id AS '讀者編號',
    m.name AS '讀者姓名',
    m.phone AS '電話',
    b.title AS '逾期書名',
    l.borrow_date AS '借出日',
    l.due_date AS '應還日',
    DATEDIFF('2026-09-22', l.due_date) AS '逾期天數',
    (DATEDIFF('2026-09-22', l.due_date) * 5) AS '應繳滯納金'
FROM loans l
INNER JOIN members m ON l.member_id = m.member_id
INNER JOIN books b ON l.book_id = b.book_id
WHERE l.status = 'overdue' OR (l.status = 'borrowed' AND l.due_date < '2026-09-22')
ORDER BY 逾期天數 DESC;
