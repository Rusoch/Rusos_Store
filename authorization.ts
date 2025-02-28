// authorization.ts
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authorized = ({ request, auth }: any) => {
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ];

  const { pathname } = request.nextUrl;

  if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const newRequestHeaders = new Headers(request.headers);
    const response = NextResponse.next({ request: { headers: newRequestHeaders } });

    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }
  return true;
};
