'use client';
import "flowbite";
import './globals.css';
import { Metadata } from 'next';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BackToTopButton from "../../components/BackToTop/BackToTop";
import { usePathname } from "next/navigation";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/login-register");
  return (
    // <html lang="en" suppressHydrationWarning>
    <html lang="en">

      {/* <Head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/image/logo.png" />

      </Head> */}
      {/* <body suppressHydrationWarning> */}
      <body >

        {/* <ClientHeader />
        <ClientBanner /> */}
        {!hideLayout && <Header />}
        {children}
        <BackToTopButton />
        {!hideLayout && <Footer />}

      </body>
    </html>
  );
}