import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// 資料庫連線設定
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smart_library',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
};

// 建立連線池 (Connection Pool)
let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// 執行 SQL 查詢的便利封裝函式
export async function query(sql, params = []) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

// 測試資料庫連線狀況
export async function testConnection() {
  try {
    const p = getPool();
    const connection = await p.getConnection();
    await connection.ping();
    connection.release();
    return { connected: true };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}
