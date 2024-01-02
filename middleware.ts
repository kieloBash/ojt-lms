// export { default } from "next-auth/middleware";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/auth/sign-in", "/auth/sign-up", "/api/auth/_log"],
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export default withAuth(
//   function middleware(req) {
//     const { pathname, origin } = req.nextUrl;
//     const { token } = req.nextauth;

//     const user = token?.user as UserType | ParentType;
//     const returnURL = `${process.env.NEXTAUTH_URL}/dashboard`;

//     if (pathname.startsWith("/transactions") && !isParent(user)) {
//       return NextResponse.redirect(returnURL);
//     } else if (pathname.startsWith("/courses") && isParent(user)) {
//       return NextResponse.redirect(returnURL);
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log("tokenmiddle", token);
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/calendar/:path*",
//     "/courses/:path*",
//     "/dashboard/:path*",
//     "/messages/:path*",
//     "/settings/:path*",
//     "/transactions/:path*",
//     "/materials/:path*",
//   ],
// };
