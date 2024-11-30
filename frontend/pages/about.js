import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | BeatMasterMind</title>
        <meta name="description" content="Learn more about BeatMasterMind and our mission." />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="About Us | BeatMasterMind" />
        <meta property="og:description" content="Learn more about BeatMasterMind and our mission." />
        <meta property="og:image" content="/img/about-og-image.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:title" content="About Us | BeatMasterMind" />
        <meta name="twitter:description" content="Learn more about BeatMasterMind and our mission." />
        <meta name="twitter:image" content="/img/about-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <div className="slugpage">
          <div className="container">
            <div className="leftblog_data_markdown pb-5 full-h">
              <>
                <div className="w-100 blogcontent">
                  <h1>About us</h1>
                  <h2>Who we are and what we do.</h2>
                  <h3>Coming soon...</h3>
                  <br />
                  <br />
                </div>
              </>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
