import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

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

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;
  const to = process.env.CONTACT_EMAIL;

  if (!host || !user || !pass || !from || !to) {
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

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Aligned4Life <${from}>`,
      to,
      replyTo: email.trim(),
      subject: `New contact form submission from ${name.trim()}`,
      text: message,
    });

    return NextResponse.json({ success: true, message: 'Welcome aboard!' });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send your message. Please try again.' },
      { status: 500 },
    );
  }
}
