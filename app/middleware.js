import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  // grab the token from the NextAuth cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // cookieName defaults to "next-auth.session-token" in production
  });

  const isLoggedIn = !!token;
  const role = token?.role;

  // public routes
  const publicPaths = ["/", "/auth/login", "/auth/register", "/products"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // admin → only ADMIN
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  // business dashboard → only BUSINESS
  if (pathname.startsWith("/businesses/dashboard") && role !== "BUSINESS") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  // user area → only USER
  if (pathname.startsWith("/user") && role !== "USER") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// export default async function middleware(req) {
//   const { nextUrl } = req;
//   const pathname = nextUrl.pathname;
//   // grab the token from the NextAuth cookie
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     // cookieName defaults to "next-auth.session-token" in production
//   });

//   const isLoggedIn = !!token;
//   const role = token?.role;

//   // public routes
//   const publicPaths = ["/", "/auth/login", "/auth/register", "/products"];
//   const isPublic = publicPaths.some((p) => pathname.startsWith(p));

//   if (!isLoggedIn && !isPublic) {
//     return NextResponse.redirect(new URL("/auth/login", nextUrl));
//   }

//   // admin → only ADMIN
//   if (pathname.startsWith("/admin") && role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }
//   // business dashboard → only BUSINESS
//   if (pathname.startsWith("/businesses/dashboard") && role !== "BUSINESS") {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }
//   // user area → only USER
//   if (pathname.startsWith("/user") && role !== "USER") {
//     return NextResponse.redirect(new URL("/", nextUrl));
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
