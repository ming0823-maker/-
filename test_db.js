import { testConnection, query, dbConfig } from './database/db.js';

async function main() {
  console.log('====================================================');
  console.log('🔍 正在測試 MySQL 資料庫連線...');
  console.log(`主機: ${dbConfig.host}:${dbConfig.port}`);
  console.log(`使用者: ${dbConfig.user}`);
  console.log(`目標資料庫: ${dbConfig.database}`);
  console.log('====================================================\n');

  const status = await testConnection();
  if (!status.connected) {
    console.error('❌ 連線失敗！原因:', status.error);
    console.log('\n💡 排查建議：');
    console.log('1. 請確認本機 MySQL 伺服器 (或 XAMPP / MariaDB) 已啟動。');
    console.log('2. 請確認是否已在 MySQL 中執行 database/setup_all.sql 建立 smart_library 資料庫。');
    console.log('3. 若密碼或通訊埠不同，請至 .env 檔案修改 DB_PASSWORD 或 DB_PORT。');
    process.exit(1);
  }

  console.log('✅ 成功連線至 MySQL 伺服器！\n');

  try {
    const tables = await query(`SHOW TABLES;`);
    console.log(`📋 目前 smart_library 資料庫內共有 ${tables.length} 張資料表：`);
    tables.forEach((t, i) => {
      const tableName = Object.values(t)[0];
      console.log(`   ${i + 1}. ${tableName}`);
    });

    console.log('\n📊 各資料表記錄筆數檢查：');
    const tableNames = ['member_types', 'members', 'categories', 'books', 'loans', 'seats', 'seat_reservations'];
    for (const tbl of tableNames) {
      try {
        const [cnt] = await query(`SELECT COUNT(*) AS total FROM ${tbl}`);
        console.log(`   - ${tbl.padEnd(18)}: ${cnt.total} 筆`);
      } catch (err) {
        console.log(`   - ${tbl.padEnd(18)}: ⚠️ 尚未建立或無法查詢 (${err.message})`);
      }
    }

    console.log('\n🎉 資料庫測試驗證完畢！');
    process.exit(0);
  } catch (err) {
    console.error('❌ 查詢資料表時發生錯誤:', err.message);
    process.exit(1);
  }
}

main();
