import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Protect /admin routes
  if (isAdminRoute) {
    if (!token && !isLoginPage) {
      // Redirect to login if accessing admin without token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    if (token && isLoginPage) {
      // Redirect to dashboard if already logged in and trying to access login page
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
