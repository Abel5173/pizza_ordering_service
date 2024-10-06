import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from '@/components/navbar';
import Footer from '@/components/footer';
import Providers from './providers';
import { getSession } from 'next-auth/react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pizza Ordering App",
  description: "Order pizza online",
};


export default async function RootLayout(
  { children,}: Readonly<{children: React.ReactNode;}>
  
) {
  const session = await getSession();
  console.log("Session from layout", session);

  return (
    <Providers session={session}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="stylesheet" href="/fonts/fonts.css" />
        </head>
        <body suppressHydrationWarning={true} className={`${geistSans.variable} ${geistMono.variable}`}>
            <AppRouterCacheProvider>
              {children}
            </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
