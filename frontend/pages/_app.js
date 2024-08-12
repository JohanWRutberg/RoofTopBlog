import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import TopLoadingLine from "@/components/TopLoadingLine";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <TopLoadingLine />
        <Aos>
          <Component {...pageProps} />
          <GoogleTagManager gtmId="GTM-T26PQD5S" />
          <GoogleAnalytics gaId="G-ED0FRQVST7" />
          {/* <GoogleAnalytics gaId="G-8M8NYVR7PQ" /> */}
        </Aos>
        <ScrollToTopBtn />
      </main>
      <Footer />
    </>
  );
}
