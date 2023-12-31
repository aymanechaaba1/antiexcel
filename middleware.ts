export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/students/:path*',
    '/teachers/:path*',
    '/settings/:path*',
    '/contacts/:path*',
  ],
};
