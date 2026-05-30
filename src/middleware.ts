import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['pl', 'en', 'ua'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(`/pl${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};