// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserType } from "./lib/interfaces/user.interface";
import { ParentType } from "./lib/interfaces/parent.interface";
import { isParent } from "./utils/helpers/isParent";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    const user = token?.user as UserType | ParentType;
    const returnURL = `${process.env.NEXTAUTH_URL}/dashboard`;

    if (pathname.startsWith("/transactions") && !isParent(user)) {
      return NextResponse.redirect(returnURL);
    } else if (pathname.startsWith("/courses") && isParent(user)) {
      return NextResponse.redirect(returnURL);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("tokenmiddle", token);
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/calendar/:path*",
    "/courses/:path*",
    "/dashboard/:path*",
    "/messages/:path*",
    "/settings/:path*",
    "/transactions/:path*",
    "/materials/:path*",
  ],
};
