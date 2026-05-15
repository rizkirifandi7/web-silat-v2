import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes (ignoring locale prefix for checks)
  const isPath = (target) =>
    pathname.match(new RegExp(`^/(${routing.locales.join("|")})?${target}`));

  const isAdminRoute = isPath("/admin");
  const isMemberRoute = isPath("/member");
  const isAuthRoute = isPath("/login") || isPath("/register");

  const getLocalePath = (path) => {
    // Avoid appending locale if it already has one, simplified for now relying on intlMiddleware to handle prefixing
    return path;
  };

  // Check auth first, then hand over to Intl middleware for routing
  if ((isAdminRoute || isMemberRoute) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = getLocalePath("/login");
    return NextResponse.redirect(url);
  }

  if (token && userRole) {
    if (isAuthRoute) {
      if (userRole === "admin") {
        const url = request.nextUrl.clone();
        url.pathname = getLocalePath("/admin/dashboard");
        return NextResponse.redirect(url);
      } else if (userRole === "anggota" || userRole === "user") {
        const url = request.nextUrl.clone();
        url.pathname = getLocalePath("/member/dashboard");
        return NextResponse.redirect(url);
      }
    }

    if (isAdminRoute && userRole !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = getLocalePath("/login");
      return NextResponse.redirect(url);
    }

    if (isMemberRoute && userRole !== "anggota" && userRole !== "user") {
      const url = request.nextUrl.clone();
      url.pathname = getLocalePath("/login");
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)",
  ],
};
