import { NextResponse } from "next/server";

export function middleware(request) {
  // Autentikasi halaman Home dan Todo Details

  //     endpoint client dan endpoint server
  const loginPath = ["/", "/api/login"];

  if (loginPath.some((v) => v === request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    const accessToken = request.cookies.get("accessToken");
    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

// Tentukan path mana saja yang mau di apply middleware
export const config = {
  matcher: "/collection/",
};
