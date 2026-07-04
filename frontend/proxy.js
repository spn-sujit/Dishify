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
  const { userId, redirectToSignIn } = auth();

  const isProtected = isProtectedRoute(req);

  // 1. Clerk protection
  if (isProtected && !userId) {
    return redirectToSignIn();
  }

  // 2. IMPORTANT: skip Arcjet for anything not protected
  if (!isProtected) {
    return NextResponse.next();
  }

  // 3. Arcjet only for protected + logged-in routes
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return new NextResponse("Forbidden", { status: 403 });
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