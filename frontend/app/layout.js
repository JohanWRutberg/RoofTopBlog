"use client"; // Ensure this file is treated as a Client Component

import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
/* import TopLoadingLine from "@/components/TopLoadingLine"; */
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Explore our Blog about Rooftop tents for all kinds of vehicles. Your indoor and outdoor adventure!"
        />
        <title>TopGear Tents Blog</title> {/* This will set the title globally */}
      </Head>
      <body>
        <Header />
        <main>
          <Aos>
            {children} {/* This will render the page components */}
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          </Aos>
          <ScrollToTopBtn />
        </main>
        <Footer />
      </body>
    </html>
  );
}
