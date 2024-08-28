import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character, robots, and OG image */}
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:locale" content="en_US" />
        <meta name="author" content="Beat Master Mind" />
        <meta property="og:image:width" content="920" />
        <meta property="og:image:height" content="470" />

        {/* Site name and keywords */}
        <meta property="og:site_name" content="Beat Master Mind, Blog about Electronic drums and accessories." />
        <meta
          name="keywords"
          content="Electronic drums, Accessories for Electronic drums, Information about Electronic drums"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,});
              `
          }}
        />

        {/* Start cookieyes banner */}
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/41d17cc816402d90e0dd2d65/script.js"
        ></script>
        {/* End cookieyes banner */}
      </Head>

      <body>
        <GoogleTagManager gtmId="GTM-T26PQD5S" />
        <GoogleAnalytics gaId="G-ED0FRQVST7" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
