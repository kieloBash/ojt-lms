import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import Head from "next/head";
// import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "The Umonics Method | LMS",
  description: "Created by interns",
  // verification: {
  //   google: "7IMyrx9OT57x4ZSjmgBFyiZRfNfXPaLbM1GF9R0_SMY",
  // },
};

const GTM_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <Script
            src="https://static.hotjar.com/c/hotjar-3882899.js?sv=6"
            strategy="afterInteractive"
          />
        </Head>
        <body className={poppins.className}>
          <main className="flex flex-col w-full min-h-screen bg-slate-50">
            <Toaster />
            <AuthProvider>
              <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
          </main>
        </body>
        <GoogleAnalytics gaId="G-7WQ6XS45Y1" />
      </html>
    </ClerkProvider>
  );
}
