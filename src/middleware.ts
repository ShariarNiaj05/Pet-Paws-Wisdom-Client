/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./helpers/jwtHelpers";

const authRoutes = ["/login", "/register"];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
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
  }
  // role based authorization
  let decodedToken = null;
  decodedToken = decode(accessToken) as any;
  const response = NextResponse.next();
  const { role, _id: userId } = decodedToken;
  console.log("decodedToken from middleware", decodedToken);
  response.cookies.set("userRole", decodedToken.role);
  response.cookies.set("userInfo", JSON.stringify(decodedToken));

  // Save token in localStorage
  localStorage.setItem("userInfo", decode(accessToken) as unknown as string);

  // Add user info to headers
  // response.headers.set("X-User-Role", role);
  // response.headers.set("X-User-Id", userId);

  // const { role } = decodedToken;

  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname === "/profile") {
    return NextResponse.next();
  }
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
