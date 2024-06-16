import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/wallet(.*)',
  '/edit-profile',
  '/profile',
  '/activity(.*)',
  '/insight',
  '/chat(.*)',
  '/personal-insight(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { nextUrl: url } = req;
  const signInUrl = new URL('/sign-in', url.origin);
  const session = auth().sessionId;

  if (isProtectedRoute(req)) {
    if (!session) {
      
      signInUrl.searchParams.set('redirectTo', url.pathname + url.search);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/api'],
};