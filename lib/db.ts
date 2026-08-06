import { existsSync } from 'fs';
import mysql from 'mysql2/promise';

const SOCKET_CANDIDATES = [
  '/var/run/mysqld/mysqld.sock',
  '/run/mysqld/mysqld.sock',
  '/var/run/mysql/mysql.sock',
  '/tmp/mysql.sock',
  '/var/lib/mysql/mysql.sock',
];

function resolveSocketPath(): string | undefined {
  if (process.env.DB_SOCKET) return process.env.DB_SOCKET;
  return SOCKET_CANDIDATES.find(existsSync);
}

const host = process.env.DB_HOST;
const socketPath = !host || host === 'localhost' ? resolveSocketPath() : undefined;

const pool = mysql.createPool({
  ...(socketPath ? { socketPath } : { host }),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  ssl: host && host !== 'localhost' && !socketPath ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
