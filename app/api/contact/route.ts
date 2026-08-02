import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { success: false, message: 'Email service is not configured.' },
      { status: 500 },
    );
  }

  const message = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Interest: ${interest}`,
    other.trim() ? `Details: ${other.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'r.bishop00@icloud.com',
      to,
      subject: `New contact form submission from ${name.trim()}`,
      text: message,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send your message. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: 'Welcome aboard!' });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send your message. Please try again.' },
      { status: 500 },
    );
  }
}
