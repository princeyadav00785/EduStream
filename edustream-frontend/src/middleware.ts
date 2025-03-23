import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest) {
  const isAuthenticated = req.cookies.get("token"); 

  const protectedRoutes = ["/auth/login", "/auth/register"];
  const url = req.nextUrl.pathname;

  if (isAuthenticated && protectedRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/", req.url)); 
  }

  if (!isAuthenticated && url === "/") {
    return NextResponse.rewrite(new URL("/homepage", req.url)); 
  }
  return NextResponse.next();
}
