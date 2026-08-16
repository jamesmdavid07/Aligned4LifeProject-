import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function normalizeDateValue(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateOnlyMatch) {
      return `${dateOnlyMatch[1]}-${dateOnlyMatch[2]}-${dateOnlyMatch[3]}`;
    }

    const parsedDate = new Date(trimmed);
    if (Number.isNaN(parsedDate.getTime())) return null;

    return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
  }

  if (value instanceof Date) {
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  }

  return null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')?.trim();
    const includeFuture = searchParams.get('includeFuture') === '1';

    let query = `SELECT id, title, subtitle, theme, key_text, image, content, week_number, publish_date
       FROM weekly_blogs`;
    const values: Array<string | number> = [];

    if (id) {
      query += ` WHERE id = ?`;
      values.push(Number(id));
    }

    if (!id && !includeFuture) {
      query += query.includes('WHERE') ? ' AND' : ' WHERE';
      query += ` publish_date <= CURDATE()`;
    }

    query += ` ORDER BY publish_date DESC, id DESC`;

    const [rows] = await pool.execute(query, values);

    const blogs = (rows as Array<Record<string, unknown>>).map((row) => {
      const publishDate = normalizeDateValue(row.publish_date);

      return {
        id: Number(row.id),
        title: String(row.title ?? ''),
        subtitle: String(row.subtitle ?? '') || undefined,
        theme: String(row.theme ?? '') || undefined,
        key_text: String(row.key_text ?? '') || undefined,
        image: String(row.image ?? ''),
        content: String(row.content ?? ''),
        week_number: row.week_number == null ? null : Number(row.week_number),
        publish_date: publishDate ?? '',
      };
    });

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Failed to fetch weekly blogs:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load weekly blogs.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'A blog id is required.' },
        { status: 400 },
      );
    }

    await pool.execute('DELETE FROM weekly_blogs WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete blog.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === 'number' ? body.id : Number(body?.id);
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const subtitle = typeof body?.subtitle === 'string' ? body.subtitle.trim() : '';
    const theme = typeof body?.theme === 'string' ? body.theme.trim() : '';
    const keyText = typeof body?.key_text === 'string' ? body.key_text.trim() : '';
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    const weekNumber = body?.week_number == null || body?.week_number === '' ? null : Number(body?.week_number);
    const publishDate = typeof body?.publish_date === 'string' ? body.publish_date.trim() : '';

    if (!id || !title || !content || !publishDate) {
      return NextResponse.json(
        { success: false, message: 'Please fill in the required fields.' },
        { status: 400 },
      );
    }

    await pool.execute(
      `UPDATE weekly_blogs
       SET title = ?, subtitle = ?, theme = ?, key_text = ?, content = ?, week_number = ?, publish_date = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, subtitle, theme, keyText, content, weekNumber, publishDate, id],
    );

    return NextResponse.json({ success: true, message: 'Blog updated successfully.' });
  } catch (error) {
    console.error('Failed to update blog:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update blog.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const subtitle = typeof body?.subtitle === 'string' ? body.subtitle.trim() : '';
    const theme = typeof body?.theme === 'string' ? body.theme.trim() : '';
    const keyText = typeof body?.key_text === 'string' ? body.key_text.trim() : '';
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    const weekNumber = body?.week_number == null || body?.week_number === '' ? null : Number(body?.week_number);
    const publishDate = typeof body?.publish_date === 'string' ? body.publish_date.trim() : '';

    if (!title || !content || !publishDate) {
      return NextResponse.json(
        { success: false, message: 'Please fill in the required fields.' },
        { status: 400 },
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO weekly_blogs (title, subtitle, theme, key_text, content, week_number, publish_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, subtitle, theme, keyText, content, weekNumber, publishDate],
    );

    const insertId = (result as { insertId?: number }).insertId ?? null;

    return NextResponse.json({
      success: true,
      message: 'Blog saved successfully',
      data: { id: insertId },
    });
  } catch (error) {
    console.error('Failed to save blog:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
