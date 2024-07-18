// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("_token");
  const user = req.cookies.get("_user");

  if (!token || !user) {
    return NextResponse.redirect("/sign-in");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"], // Defina as rotas que precisam de autenticação
};
