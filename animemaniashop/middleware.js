import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = "mon_secret"; // Utilise une variable d'environnement

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protéger certaines pages
};
