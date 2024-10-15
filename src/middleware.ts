/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authServices";

const AuthRoutes = ["/login", "/register"];
type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/dashboard/],
  admin: [/^\/admin-dashboard/],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const accessToken = cookies().get("accessToken")?.value;
  /* if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  } */
  const user = await getCurrentUser();
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  // role based authorization
  /* let decodedToken = null;
  decodedToken = decode(accessToken) as any;
  const response = NextResponse.next();
  const { role } = decodedToken;
  console.log("decodedToken from middleware", decodedToken);
  console.log("accessToken from middleware", accessToken);

  response.cookies.set("userRole", decodedToken.role);
  response.cookies.set("userInfo", JSON.stringify(decodedToken)); */

  // Add user info to headers
  // response.headers.set("X-User-Role", role);
  // response.headers.set("X-User-Id", userId);

  // const { role } = decodedToken;

  /*   if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname === "/profile") {
    return NextResponse.next();
  } */
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};
