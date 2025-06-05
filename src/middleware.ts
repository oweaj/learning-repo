import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const getToken = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb"));
  const loginTime = request.cookies.get("sb-login-time")?.value;

  if (!getToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (loginTime) {
    const now = Date.now();
    const isLoginTime = Number(loginTime);
    const LOGIN_LIMIT_TIME = 2 * 60 * 60 * 1000;

    if (now - isLoginTime >= LOGIN_LIMIT_TIME) {
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url),
      );

      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.startsWith("sb")) {
          response.cookies.delete(cookie.name);
        }
      });

      return response;
    }
  }
}

export const config = {
  matcher: ["/auth:path*", "/", "/blog:path*"],
};
