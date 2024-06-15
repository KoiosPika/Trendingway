import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/wallet(.*)',
  '/edit-profile',
  '/profile',
  '/activity(.*)',
  '/insight',
  '/chat(.*)',
  '/personal-insight(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/api'],
};