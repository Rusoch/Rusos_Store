// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Check for a cookie named "sessionCartId"
  const sessionCartId = request.cookies.get('sessionCartId');

  if (!sessionCartId) {
    // Generate a new sessionCartId if not found
    const newSessionCartId = crypto.randomUUID(); // Edge-compatible method
    const response = NextResponse.next();
    response.cookies.set('sessionCartId', newSessionCartId, { path: '/' });
    return response;
  }

  // Otherwise, let the request continue
  return NextResponse.next();
}

// Optionally, specify paths for this middleware to run on
export const config = {
  matcher: ['/'], // Adjust this matcher to your needs
};
