import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req : any) {
    console.log("token", req.nextauth.token.role);
    console.log("req", req?.nextUrl.pathname);
    const url = req?.nextUrl.pathname;
    const role = req?.nextauth?.token?.role;
    console.log("token", req.nextauth.token);
    // if (url.startsWith("/admin") === true) {
    //   if (role !== "admin") {
    //     return NextResponse.redirect(new URL("/user", req.url));
    //     // return NextResponse.rewrite(new URL("/notaccess", req.url));
    //   } else {
    //     return NextResponse.next();
    //   }
    // }
    // if (url.startsWith("/admin") === true) {
    //   if (role !== "admin") {
    //     return NextResponse.rewrite(new URL('/notaccess', req.url))
    //   } else {
    //     return NextResponse.next()
    //   }
    // }if (url.startsWith("/user") === true) {
    //   if (role !== "user") {
    //     return NextResponse.rewrite(new URL('/notaccess', req.url))
    //   } else {
    //     return NextResponse.next()
    //   }
    // }
    if (url.startsWith("/admin")) {
      if (!['admin'].includes(role)) {
        // return NextResponse.rewrite(new URL('/notaccess', request.url));
        return NextResponse.redirect(new URL("/user", req.url));
      } else {
        return NextResponse.next();
      }
    }
    if (url.startsWith("/user")) {
      if (role != "user") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        return NextResponse.next();
      }
    }

  },
  
  
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
      signOut: "/auth/login",
      // error: '/api/auth/error',
    },
  }
);

export const config = { matcher: ["/admin", "/admin/:path*",] };
