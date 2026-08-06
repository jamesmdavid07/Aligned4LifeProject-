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

    let query = `SELECT id, title, subtitle, image, content, week_number, publish_date
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
