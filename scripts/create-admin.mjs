import { existsSync } from 'node:fs';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const SOCKET_CANDIDATES = [
  '/var/run/mysqld/mysqld.sock',
  '/run/mysqld/mysqld.sock',
  '/var/run/mysql/mysql.sock',
  '/tmp/mysql.sock',
  '/var/lib/mysql/mysql.sock',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveSocketPath() {
  if (process.env.DB_SOCKET) return process.env.DB_SOCKET;
  return SOCKET_CANDIDATES.find(existsSync);
}

const args = process.argv.slice(2);
const updateIndex = args.indexOf('--update');
const update = updateIndex !== -1;
if (updateIndex !== -1) args.splice(updateIndex, 1);

const [emailArg, passwordArg, roleArg] = args;

const email = (emailArg || '').trim().toLowerCase();
const password = passwordArg || '';
const role = (roleArg || 'developer').toLowerCase();

const VALID_ROLES = ['owner', 'developer'];

if (!email || !EMAIL_PATTERN.test(email)) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password> [role] [--update]');
  console.error('  <email> must be a valid email address.');
  console.error('  [role] is "developer" (default) or "owner".');
  process.exit(1);
}

if (!VALID_ROLES.includes(role)) {
  console.error(`Role must be one of: ${VALID_ROLES.join(', ')}.`);
  process.exit(1);
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters long.');
  process.exit(1);
}

const requiredEnv = ['DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Run with: node --env-file=.env.local scripts/create-admin.mjs ...');
  process.exit(1);
}

const host = process.env.DB_HOST;
const socketPath = !host || host === 'localhost' ? resolveSocketPath() : undefined;

let connection;
try {
  connection = await mysql.createConnection({
    ...(socketPath ? { socketPath } : { host: host || 'localhost' }),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    ssl: host && host !== 'localhost' && !socketPath ? { rejectUnauthorized: false } : undefined,
  });
} catch (err) {
  console.error(`Failed to connect to the database: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

try {
  const [rows] = await connection.execute(
    'SELECT id FROM admin_accounts WHERE email = ? LIMIT 1',
    [email]
  );
  const existing = rows.length > 0;

  if (role === 'owner') {
    const [ownerRows] = await connection.execute(
      "SELECT id FROM admin_accounts WHERE role = 'owner' AND email <> ? LIMIT 1",
      [email]
    );
    if (ownerRows.length > 0) {
      console.error('An owner account already exists for a different email.');
      process.exitCode = 1;
    } else {
      if (existing && !update) {
        console.error(`Admin "${email}" already exists. Pass --update to update it.`);
        process.exitCode = 1;
      } else {
        const hash = await bcrypt.hash(password, 12);
        if (existing) {
          await connection.execute(
            'UPDATE admin_accounts SET role = ?, password = ? WHERE email = ?',
            [role, hash, email]
          );
          console.log(`Updated admin "${email}" (role: ${role}).`);
        } else {
          await connection.execute(
            'INSERT INTO admin_accounts (email, role, password) VALUES (?, ?, ?)',
            [email, role, hash]
          );
          console.log(`Created admin "${email}" (role: ${role}).`);
        }
      }
    }
  } else if (existing && !update) {
    console.error(`Admin "${email}" already exists. Pass --update to reset its password.`);
    process.exitCode = 1;
  } else {
    const hash = await bcrypt.hash(password, 12);
    if (existing) {
      await connection.execute(
        'UPDATE admin_accounts SET role = ?, password = ? WHERE email = ?',
        [role, hash, email]
      );
      console.log(`Updated admin "${email}" (role: ${role}).`);
    } else {
      await connection.execute(
        'INSERT INTO admin_accounts (email, role, password) VALUES (?, ?, ?)',
        [email, role, hash]
      );
      console.log(`Created admin "${email}" (role: ${role}).`);
    }
  }
} catch (err) {
  console.error(`Admin account operation failed: ${err instanceof Error ? err.message : err}`);
  process.exitCode = 1;
} finally {
  await connection.end();
}
