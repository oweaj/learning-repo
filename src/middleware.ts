import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const getToken = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb"));

  if (!getToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/auth:path*", "/", "/blog:path*"],
};
