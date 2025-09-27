import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (
    accessToken &&
    (request.nextUrl.pathname === "/auth/signin" ||
      request.nextUrl.pathname === "/auth/signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/auth:path*", "/", "/blog:path*", "/my:path*"],
};
