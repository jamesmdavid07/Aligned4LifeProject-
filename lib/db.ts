import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    return { ok: true };
  } finally {
    connection.release();
  }
}

export default pool;
