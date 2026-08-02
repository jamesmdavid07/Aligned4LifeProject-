import { NextResponse } from 'next/server';
import { testConnection, connectionTarget } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing database environment variables. Please fill .env.local first.',
        },
        { status: 500 },
      );
    }

    const result = await testConnection();

    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: 'Database connection failed.', target: connectionTarget },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database connected successfully',
      target: connectionTarget,
    });
  } catch (error) {
    console.error('DB test failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed.',
        target: connectionTarget,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
