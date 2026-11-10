# 智慧圖書館與自習室預約系統 - MySQL 資料庫規格書

本系統採用 **MySQL 8.0+**，字元編碼為 `utf8mb4`，排序規則為 `utf8mb4_unicode_ci`。
經過**第三正規化（3NF）**設計，涵蓋 **7 張核心資料表**，完整支援圖書館藏書流通、讀者借閱權限管理與自習座位預約時段防撞。

---

## 📊 1. ER 實體關聯圖 (Entity-Relationship Diagram)

```mermaid
erDiagram
    MEMBER_TYPES ||--o{ MEMBERS : "1 對 多 (身分定義讀者權限)"
    CATEGORIES ||--o{ BOOKS : "1 對 多 (分類收納圖書)"
    
    MEMBERS ||--o{ LOANS : "1 對 多 (讀者擁有多筆借閱)"
    BOOKS ||--o{ LOANS : "1 對 多 (書籍有多筆流通紀錄)"

    MEMBERS ||--o{ SEAT_RESERVATIONS : "1 對 多 (讀者預約自習座位)"
    SEATS ||--o{ SEAT_RESERVATIONS : "1 對 多 (座位被不同時段預約)"

    MEMBER_TYPES {
        int type_id PK "身分代碼"
        varchar type_name "身分名稱(學生/教職員/一般讀者)"
        int max_borrow_limit "借閱上限本數"
        int max_loan_days "最長借期天數"
        int max_seat_hours "單次座位預約上限時數"
    }

    MEMBERS {
        varchar member_id PK "讀者證號 (MEM-2001)"
        int type_id FK "所屬身分"
        varchar name "讀者姓名"
        varchar email UK "電子郵件"
        varchar phone "聯絡電話"
        enum status "帳號狀態 (active/suspended)"
        date joined_date "入會日期"
        varchar notes "系所/單位備註"
    }

    CATEGORIES {
        int category_id PK "分類代碼"
        varchar category_name UK "分類名稱"
        varchar code UK "分類縮寫代碼"
    }

    BOOKS {
        varchar book_id PK "館藏編號 (BK-1001)"
        varchar isbn UK "國際標準書號"
        varchar title "書籍標題"
        varchar author "作者"
        varchar publisher "出版社"
        int category_id FK "分類代碼"
        int publish_year "出版年"
        varchar location "架位代碼"
        int total_copies "總藏書量"
        int available_copies "在庫可借量"
        varchar cover_color "介面代表色"
        text description "簡介"
    }

    LOANS {
        varchar loan_id PK "借閱單號 (LN-3001)"
        varchar book_id FK "書籍編號"
        varchar member_id FK "讀者證號"
        date borrow_date "借出日"
        date due_date "應還日"
        date return_date "實還日"
        enum status "狀態 (borrowed/returned/overdue)"
        int renew_count "續借次數"
        decimal fine_amount "滯納金"
    }

    SEATS {
        varchar seat_id PK "座位代碼 (SEAT-A01)"
        varchar seat_number "座位號 (A-01)"
        varchar zone_name "分區名稱"
        varchar seat_type "席位型態"
        varchar features "配備特色"
        enum status "狀態 (available/occupied/maintenance)"
    }

    SEAT_RESERVATIONS {
        varchar reservation_id PK "預約單號 (RES-4001)"
        varchar seat_id FK "座位代碼"
        varchar member_id FK "讀者證號"
        date reserve_date "預約日期"
        time start_time "開始時段"
        time end_time "結束時段"
        int duration_hours "預約時數"
        enum status "狀態 (reserved/checked_in/completed/cancelled)"
        datetime created_at "建立時間"
    }
```

---

## 📁 2. SQL 檔案架構

- **`schema.sql`**：建庫、建表（7 張 Table）、外鍵約束、欄位限制（CHECK）、高頻查詢索引（INDEX）。
- **`seed.sql`**：系統初始資料，包含原本現有系統中的 8 本精選書籍、5 位讀者、8 筆流通紀錄、12 個多功能席位、6 筆座位預約。
- **`setup_all.sql`**：**一鍵安裝完整腳本**（整合建表 + 範例資料）。
- **`queries.sql`**：6 大核心業務進階 SQL 查詢（多表 JOIN、GROUP BY 統計、排行、滯納金計算報表）。

---

## 🚀 3. 如何在 MySQL 中匯入

### 方法一：使用命令列（Command Line）
```bash
mysql -u root -p < database/setup_all.sql
```

### 方法二：使用 GUI 工具（MySQL Workbench / phpMyAdmin / HeidiSQL）
1. 打開你的 MySQL 管理工具連線至資料庫。
2. 開啟 **`database/setup_all.sql`** 檔案。
3. 點擊 **Execute (全文執行)**。
4. 重新整理資料庫列表，即可看見 **`smart_library`** 資料庫與 7 張完整的資料表及資料。

---

## 🔍 4. 業務驗證與進階查詢 (摘錄自 queries.sql)

1. **借閱中與逾期未還清單（多表關聯 JOIN）**：
   - 串接 `loans` + `books` + `members` + `member_types`，即時呈現催繳對象。
2. **各類別藏書量與流通借出率分析（GROUP BY 聚合統計）**：
   - 計算各分類庫存與流通比例，直接對應系統 Dashboard 圖表。
3. **自習室預約時段衝突檢核（防重複預約）**：
   - 透過 `seat_id`、`reserve_date` 與時段範圍 `start_time` / `end_time` 檢核防撞。
