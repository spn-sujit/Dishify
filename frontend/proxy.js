import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { aj } from './lib/arcjet';

const isProtectedRoute=createRouteMatcher([
  "/recipe(.*)",
  "/recipes(.*)",
  "/pantry(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const isProtected = isProtectedRoute(req);
  const { userId, redirectToSignIn } = auth();

  // 1. Clerk protection first
  if (isProtected && !userId) {
    return redirectToSignIn();
  }

  // 2. Run Arcjet ONLY for protected routes AND logged-in users
  if (isProtected && userId) {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};