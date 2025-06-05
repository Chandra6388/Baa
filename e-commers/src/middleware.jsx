import { NextResponse } from 'next/server';

export function middleware(request) {
  const userCookie = request.cookies.get('user')?.value;
 

  if (!userCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userData = JSON.parse(userCookie);


  // // Admin check
  // if (request.nextUrl.pathname.startsWith('/admin') && userData.role !== 'ADMIN') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // User check
  // if (request.nextUrl.pathname.startsWith('/user') && userData.role !== 'USER') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // Seller check
  // if (request.nextUrl.pathname.startsWith('/seller') && userData.role !== 'SELLER') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/seller/:path*'],
};