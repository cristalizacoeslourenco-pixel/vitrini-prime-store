import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "vp_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 horas

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { password } = body as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || expected === "PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL") {
    return NextResponse.json({ error: "Senha de admin não configurada." }, { status: 503 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
