import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = 'admin_session';

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is not set.');
  }
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ['HS256'] });
    return typeof payload.sub === 'string' && typeof payload.role === 'string';
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isProtectedApi =
    (pathname === '/api/devotionals' && request.method !== 'GET') ||
    pathname === '/api/upload';

  if (isProtectedApi) {
    if (!(await hasValidSession(request))) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (isAdminPage) {
    if (!(await hasValidSession(request))) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/devotionals', '/api/upload'],
};
