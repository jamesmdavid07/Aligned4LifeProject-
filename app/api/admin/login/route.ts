import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  createSessionToken,
  verifyPassword,
} from '@/lib/auth';

type AdminRow = { id: number; email: string; role: string; password: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: 'Email and password are required.' },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  let admin: AdminRow | undefined;
  try {
    const [rows] = await pool.execute(
      'SELECT id, email, role, password FROM admin_accounts WHERE email = ? LIMIT 1',
      [email]
    );
    admin = (rows as AdminRow[])[0];
  } catch (err) {
    console.error('Admin login query failed:', err);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }

  const passwordOk = admin ? await verifyPassword(password, admin.password) : false;

  if (!admin || !passwordOk) {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password.' },
      { status: 401 }
    );
  }

  const token = await createSessionToken({
    id: admin.id,
    email: admin.email,
    role: admin.role || 'developer',
  });
  const response = NextResponse.json({ success: true, message: 'Logged in.' });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
