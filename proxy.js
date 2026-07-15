import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/api/protected", "/api/auth/proctect"];
const authOnlyRoutes = ["/login", "/register"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? await verifyToken(token) : null;
  const isLoggedIn = !!user;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthOnlyRoute = authOnlyRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnlyRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isLoggedIn) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", user.userId);
    requestHeaders.set("x-user-email", user.email);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*", "/api/auth/proctect/:path*", "/login", "/register"],
};
