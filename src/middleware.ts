import { NextRequest, NextResponse } from "next/server";

const protectedRoutes=["/","/profile"];
const publicRoutes=["/login","/register"];

export default function middleware(req:NextRequest){
    const path = req.nextUrl.pathname;

    const isProtected = protectedRoutes.includes(path) || path.startsWith("/post/");
    const isPublic = publicRoutes.includes(path);

    const token = req.cookies.get('token')?.value;

    if(isProtected && !token){
        return NextResponse.redirect(new URL('/login',req.nextUrl));
    }

    if(isPublic && token){
        return NextResponse.redirect(new URL('/',req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

