import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (
    (token && request.nextUrl.pathname === "/auth/signin") ||
    request.nextUrl.pathname === "/auth/signup"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/auth:path*", "/", "/blog:path*"],
};
