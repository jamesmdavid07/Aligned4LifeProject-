import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession, hashPassword, isOwner, ADMIN_ROLES } from '@/lib/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AdminRow = { id: number; email: string; role: string; created_at: string | Date };

async function requireOwner() {
  const session = await getSession();
  if (!session) {
    return { session: null, error: NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 }) };
  }
  if (!isOwner(session)) {
    return { session, error: NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 }) };
  }
  return { session, error: null };
}

export async function GET() {
  const { error } = await requireOwner();
  if (error) return error;

  try {
    const [rows] = await pool.execute(
      'SELECT id, email, role, created_at FROM admin_accounts ORDER BY id ASC'
    );
    const accounts = (rows as AdminRow[]).map((row) => ({
      id: Number(row.id),
      email: row.email,
      role: row.role,
      createdAt:
        row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ''),
    }));
    return NextResponse.json({ success: true, data: accounts });
  } catch (err) {
    console.error('List admin accounts failed:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireOwner();
  if (error) return error;

  let body: { email?: unknown; role?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const role = typeof body.role === 'string' ? body.role : 'developer';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
  }
  if (!ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
    return NextResponse.json(
      { success: false, message: 'Role must be "owner" or "developer".' },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { success: false, message: 'Password must be at least 8 characters long.' },
      { status: 400 }
    );
  }

  try {
    const [existingRows] = await pool.execute(
      'SELECT id FROM admin_accounts WHERE email = ? LIMIT 1',
      [email]
    );
    if ((existingRows as AdminRow[]).length > 0) {
      return NextResponse.json(
        { success: false, message: 'An account with that email already exists.' },
        { status: 409 }
      );
    }

    if (role === 'owner') {
      const [ownerRows] = await pool.execute("SELECT id FROM admin_accounts WHERE role = 'owner' LIMIT 1");
      if ((ownerRows as AdminRow[]).length > 0) {
        return NextResponse.json(
          { success: false, message: 'An owner account already exists.' },
          { status: 400 }
        );
      }
    }

    const hash = await hashPassword(password);
    await pool.execute('INSERT INTO admin_accounts (email, role, password) VALUES (?, ?, ?)', [
      email,
      role,
      hash,
    ]);
    return NextResponse.json({ success: true, message: 'Account created.' });
  } catch (err) {
    console.error('Create admin account failed:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { session, error } = await requireOwner();
  if (error) return error;

  const id = Number(request.nextUrl.searchParams.get('id'));
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ success: false, message: 'Invalid account id.' }, { status: 400 });
  }
  if (id === Number(session?.sub)) {
    return NextResponse.json(
      { success: false, message: 'You cannot delete your own account.' },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.execute('SELECT id, role FROM admin_accounts WHERE id = ? LIMIT 1', [
      id,
    ]);
    const target = (rows as AdminRow[])[0];
    if (!target) {
      return NextResponse.json({ success: false, message: 'Account not found.' }, { status: 404 });
    }
    if (target.role === 'owner') {
      return NextResponse.json(
        { success: false, message: 'The owner account cannot be deleted.' },
        { status: 400 }
      );
    }

    await pool.execute('DELETE FROM admin_accounts WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Account deleted.' });
  } catch (err) {
    console.error('Delete admin account failed:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { session, error } = await requireOwner();
  if (error) return error;

  let body: { id?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const id = Number(body.id);
  const password = typeof body.password === 'string' ? body.password : '';

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ success: false, message: 'Invalid account id.' }, { status: 400 });
  }
  if (id === Number(session?.sub)) {
    return NextResponse.json(
      { success: false, message: 'Use Account settings to change your own password.' },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { success: false, message: 'Password must be at least 8 characters long.' },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.execute('SELECT id, role FROM admin_accounts WHERE id = ? LIMIT 1', [
      id,
    ]);
    const target = (rows as AdminRow[])[0];
    if (!target) {
      return NextResponse.json({ success: false, message: 'Account not found.' }, { status: 404 });
    }
    if (target.role === 'owner') {
      return NextResponse.json(
        { success: false, message: 'The owner password cannot be changed here.' },
        { status: 400 }
      );
    }

    const hash = await hashPassword(password);
    await pool.execute('UPDATE admin_accounts SET password = ? WHERE id = ?', [hash, id]);
    return NextResponse.json({ success: true, message: 'Password updated.' });
  } catch (err) {
    console.error('Reset admin password failed:', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
