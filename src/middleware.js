import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isMemberRoute = pathname.startsWith("/member");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // Redirect to login if accessing protected route without token
  if ((isAdminRoute || isMemberRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control
  if (token && userRole) {
    // Prevent access to login/register if already logged in
    if (isAuthRoute) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (userRole === "anggota" || userRole === "user") {
        // adjusting assumption: user might be redirected to member dashboard
        return NextResponse.redirect(new URL("/member/dashboard", request.url));
      } else {
        // Allow access to login if role is unknown/invalid to let them re-login
        // or clear cookies manually. Redirecting to /login causes a loop.
        return NextResponse.next();
      }
    }

    // Protect admin routes
    if (isAdminRoute && userRole !== "admin") {
      // Redirect unauthorized users to their appropriate dashboard or home
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Protect member routes
    if (isMemberRoute && userRole !== "anggota" && userRole !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)",
  ],
};
