import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
}

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard', '/kwode', '/aptitude', '/settings'],
};
