import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession, hashPassword, verifyPassword } from '@/lib/auth';

type AdminRow = { id: number; password: string };

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let body: { currentPassword?: unknown; newPassword?: unknown; confirmPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
  const confirmPassword = typeof body.confirmPassword === 'string' ? body.confirmPassword : '';

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { success: false, message: 'All fields are required.' },
      { status: 400 }
    );
  }
  if (newPassword.length < 8) {
    return NextResponse.json(
      { success: false, message: 'New password must be at least 8 characters long.' },
      { status: 400 }
    );
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { success: false, message: 'New passwords do not match.' },
      { status: 400 }
    );
  }

  let admin: AdminRow | undefined;
  try {
    const [rows] = await pool.execute(
      'SELECT id, password FROM admin_accounts WHERE id = ? LIMIT 1',
      [Number(session.sub)]
    );
    admin = (rows as AdminRow[])[0];
  } catch (err) {
    console.error('Password change lookup failed:', err);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }

  if (!admin) {
    return NextResponse.json({ success: false, message: 'Account not found.' }, { status: 404 });
  }

  const currentOk = await verifyPassword(currentPassword, admin.password);
  if (!currentOk) {
    return NextResponse.json(
      { success: false, message: 'Current password is incorrect.' },
      { status: 401 }
    );
  }

  const hash = await hashPassword(newPassword);
  try {
    await pool.execute('UPDATE admin_accounts SET password = ? WHERE id = ?', [
      hash,
      admin.id,
    ]);
  } catch (err) {
    console.error('Password update failed:', err);
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: 'Password updated.' });
}
