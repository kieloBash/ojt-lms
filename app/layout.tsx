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

export const metadata: Metadata = {
  title: "Umonics LMS",
  description: "Created by interns",
  verification: {
    google: "7IMyrx9OT57x4ZSjmgBFyiZRfNfXPaLbM1GF9R0_SMY",
  },
};

// const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7WQ6XS45Y1"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          functiongtag(){dataLayer.push(arguments);}
          gtag('js', newDate());
          gtag('config', 'G-7WQ6XS45Y1', {
            page_path: window.location.pathname,
          });
        `,
          }}
        /> */}
        {/* <Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
          </Script>
        </Head> */}
        <body className={poppins.className}>
          <main className="flex flex-col w-full min-h-screen bg-slate-50">
            <Toaster />
            <AuthProvider>
              <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
