import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const { pathname, origin } = req.nextUrl;

  // if (pathname.startsWith('/students')) {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set('page', '1');
  //   searchParams.set('per_page', '5');

  //   const url = new URL(`${pathname}?${searchParams.toString()}`, origin);

  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/students/:path*'],
};
