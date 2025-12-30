import { NextRequest, NextResponse } from "next/server";
import { env, routes } from "./config/env";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(env.SESSION_COOKIE_NAME);
  const isAuthenticated = !!sessionCookie;

  const isProtectedRoute = routes.protected.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = routes.auth.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL("/app", request.url);

    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
};
