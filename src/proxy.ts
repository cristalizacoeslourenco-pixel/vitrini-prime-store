import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "vp_admin_session";
const LOGIN_PATH = "/admin/login";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin") || pathname.startsWith(LOGIN_PATH)) {
    return NextResponse.next();
  }

  const session = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_PASSWORD;

  // Sem senha configurada, acesso livre (facilita primeiro deploy)
  if (!expected || expected === "PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL") {
    return NextResponse.next();
  }

  if (!session || session !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
