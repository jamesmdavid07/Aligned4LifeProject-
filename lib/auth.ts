import 'server-only';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};

export type AdminSession = {
  sub: string;
  email: string;
  role: string;
};

export const ADMIN_ROLES = ['owner', 'developer'] as const;

export function isOwner(session: AdminSession | null): session is AdminSession {
  return session?.role === 'owner';
}

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is not set.');
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function createSessionToken(admin: {
  id: number;
  email: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ email: admin.email, role: admin.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(admin.id))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ['HS256'] });
    if (
      typeof payload.sub !== 'string' ||
      typeof payload.email !== 'string' ||
      typeof payload.role !== 'string'
    ) {
      return null;
    }
    return { sub: payload.sub, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
