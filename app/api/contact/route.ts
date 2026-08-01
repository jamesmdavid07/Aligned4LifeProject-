import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: { name?: string; email?: string; interest?: string; other?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const { name = '', email = '', interest = '', other = '' } = body;

  if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid name and email.' },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Welcome aboard!',
    data: { name: name.trim(), email: email.trim(), interest, other: other.trim() },
  });
}
