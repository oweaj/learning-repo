import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access");
  const loginPage = request.nextUrl.pathname === "/login";

  if (loginPage) {
    if (token) {
      return NextResponse.redirect(new URL("/0", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/0", "/blog:path*"],
};
