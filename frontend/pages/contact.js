import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | BeatMasterMind</title>
        <meta name="description" content="Learn more about BeatMasterMind and our mission." />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Contact Us | BeatMasterMind" />
        <meta property="og:description" content="Learn more about BeatMasterMind and our mission." />
        <meta property="og:image" content="/img/contact-og-image.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:title" content="Contact Us | BeatMasterMind" />
        <meta name="twitter:description" content="Learn more about BeatMasterMind and our mission." />
        <meta name="twitter:image" content="/img/contact-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <div className="slugpage">
          <div className="container">
            <div className="leftblog_data_markdown pb-5">
              <>
                <div className="w-100 blogcontent">
                  <h1>Contact us</h1>
                  <h3>Coming soon...</h3>
                </div>
              </>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
