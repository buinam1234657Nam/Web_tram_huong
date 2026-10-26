import { NextResponse, type NextRequest } from "next/server";

/**
 * Vietnamese pages keep their unprefixed URLs ("/san-pham") and are served
 * from the internal "/vi/..." routes; English pages are "/en/...".
 * "/vi/..." itself redirects to the unprefixed URL so there's one address per page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/vi${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next internals, API routes, metadata routes and any file with an extension.
  matcher: ["/((?!_next/|api/|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)"],
};
