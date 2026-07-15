import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

// Routes that require the user to be logged in
const protectedRoutes = ["/dashboard", "/api/protected"];

// Routes a logged-in user shouldn't see again (login/register pages)
const authOnlyRoutes = ["/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const user = token ? await verifyToken(token) : null;
  const isLoggedIn = !!user;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthOnlyRoute = authOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Not logged in but trying to access a protected route
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

  // Already logged in but trying to visit login/register page
  if (isAuthOnlyRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Attach decoded user info to request headers so downstream
  // Server Components / Route Handlers can read it if needed
  if (isLoggedIn) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", user.userId);
    requestHeaders.set("x-user-email", user.email);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

// Only run middleware on the routes we actually care about
export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*", "/login", "/register"],
};
