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
    const requestedDate = normalizeDateValue(searchParams.get('date')?.trim());
    const id = searchParams.get('id')?.trim();

    let query = `SELECT id, title, scripture, image, content, ellen_white_insight, reflection, todays_declaration, appeal, prayer, full_key_verse, publish_date
       FROM devotionals`;
    const values: Array<string | number> = [];

    if (id) {
      query += ` WHERE id = ?`;
      values.push(Number(id));
    } else if (requestedDate) {
      query += ` WHERE DATE(publish_date) = ?`;
      values.push(requestedDate);
    }

    query += ` ORDER BY publish_date DESC, id DESC`;

    const [rows] = await pool.execute(query, values);

    const devotionals = (rows as Array<Record<string, unknown>>).map((row) => {
      const publishDate = normalizeDateValue(row.publish_date);

      return {
        id: Number(row.id),
        title: String(row.title ?? ''),
        scripture: String(row.scripture ?? ''),
        image: String(row.image ?? ''),
        content: String(row.content ?? ''),
        ellenWhiteInsight: String(row.ellen_white_insight ?? ''),
        reflection: String(row.reflection ?? ''),
        todaysDeclaration: String(row.todays_declaration ?? ''),
        appeal: String(row.appeal ?? ''),
        prayer: String(row.prayer ?? ''),
        fullKeyVerse: String(row.full_key_verse ?? ''),
        publish_date: publishDate ?? '',
        date: publishDate ?? '',
      };
    });

    return NextResponse.json({ success: true, data: devotionals });
  } catch (error) {
    console.error('Failed to fetch devotionals:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load devotionals.',
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
        { success: false, message: 'A devotional id is required.' },
        { status: 400 },
      );
    }

    await pool.execute('DELETE FROM devotionals WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Devotional deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete devotional:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete devotional.',
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
    const scripture = typeof body?.scripture === 'string' ? body.scripture.trim() : '';
    const image = typeof body?.image === 'string' ? body.image.trim() : '';
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    const ellenWhiteInsight = typeof body?.ellenWhiteInsight === 'string' ? body.ellenWhiteInsight.trim() : '';
    const reflection = typeof body?.reflection === 'string' ? body.reflection.trim() : '';
    const todaysDeclaration = typeof body?.todaysDeclaration === 'string' ? body.todaysDeclaration.trim() : '';
    const appeal = typeof body?.appeal === 'string' ? body.appeal.trim() : '';
    const prayer = typeof body?.prayer === 'string' ? body.prayer.trim() : '';
    const fullKeyVerse = typeof body?.fullKeyVerse === 'string' ? body.fullKeyVerse.trim() : '';
    const publishDate = typeof body?.publish_date === 'string' ? body.publish_date.trim() : '';

    if (!id || !title || !scripture || !content || !publishDate) {
      return NextResponse.json(
        { success: false, message: 'Please fill in the required fields.' },
        { status: 400 },
      );
    }

    await pool.execute(
       `UPDATE devotionals
        SET title = ?, scripture = ?, image = ?, content = ?, ellen_white_insight = ?, reflection = ?, todays_declaration = ?, appeal = ?, prayer = ?, full_key_verse = ?, publish_date = ?, updated_at = NOW()
        WHERE id = ?`,
      [title, scripture, image, content, ellenWhiteInsight, reflection, todaysDeclaration, appeal, prayer, fullKeyVerse, publishDate, id],
    );

    return NextResponse.json({ success: true, message: 'Devotional updated successfully.' });
  } catch (error) {
    console.error('Failed to update devotional:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update devotional.',
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
    const scripture = typeof body?.scripture === 'string' ? body.scripture.trim() : '';
    const image = typeof body?.image === 'string' ? body.image.trim() : '';
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    const ellenWhiteInsight = typeof body?.ellenWhiteInsight === 'string' ? body.ellenWhiteInsight.trim() : '';
    const reflection = typeof body?.reflection === 'string' ? body.reflection.trim() : '';
    const todaysDeclaration = typeof body?.todaysDeclaration === 'string' ? body.todaysDeclaration.trim() : '';
    const appeal = typeof body?.appeal === 'string' ? body.appeal.trim() : '';
    const prayer = typeof body?.prayer === 'string' ? body.prayer.trim() : '';
    const fullKeyVerse = typeof body?.fullKeyVerse === 'string' ? body.fullKeyVerse.trim() : '';
    const publishDate = typeof body?.publish_date === 'string' ? body.publish_date.trim() : '';

    if (!title || !scripture || !content || !publishDate) {
      return NextResponse.json(
        { success: false, message: 'Please fill in the required fields.' },
        { status: 400 },
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO devotionals (title, scripture, image, content, ellen_white_insight, reflection, todays_declaration, appeal, prayer, full_key_verse, publish_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, scripture, image, content, ellenWhiteInsight, reflection, todaysDeclaration, appeal, prayer, fullKeyVerse, publishDate],
    );

    const insertId = (result as { insertId?: number }).insertId ?? null;

    return NextResponse.json({
      success: true,
      message: 'Devotional saved successfully',
      data: { id: insertId },
    });
  } catch (error) {
    console.error('Failed to save devotional:', error);
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
