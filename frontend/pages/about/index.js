import Head from "next/head";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | TopGear Tents</title>
        <meta
          name="description"
          content="Learn about TopGear Tents, the ultimate resource for drummers seeking expert advice on electronic drums and accessories."
        />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="About Us | TopGear Tents" />
        <meta
          property="og:description"
          content="Learn about TopGear Tents, the ultimate resource for drummers seeking expert advice on electronic drums and accessories."
        />
        <meta property="og:image" content="/img/about-og-image.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:title" content="About Us | TopGear Tents" />
        <meta
          name="twitter:description"
          content="Learn about TopGear Tents, the ultimate resource for drummers seeking expert advice on electronic drums and accessories."
        />
        <meta name="twitter:image" content="/img/about-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <div className="slugpage">
          <div className="container">
            <div className="leftblog_data_markdown pb-5">
              <>
                <div className="w-100 blogcontent">
                  <h1>About us</h1>
                  <h2>Who we are and what we do</h2>
                  <p>
                    Welcome to <b>TopGear Tents</b>, your ultimate resource for everything related to rooftop tents and
                    vehicle-based camping. Whether you’re a seasoned adventurer or new to the world of overlanding,
                    we’re here to guide you with tips, reviews, and insights to elevate your outdoor experiences.
                    <br />
                    <br />
                    The team behind TopGear Tents brings together a unique blend of expertise and passion: <br />
                    <br />
                    <b>Johan</b> is a software developer and test engineer with a deep love for the outdoors. As a
                    rooftop tent enthusiast, he combines his technical knowledge with hands-on experience to provide
                    reliable advice and product recommendations. <br />
                    <br />
                    <b>Pernilla</b> is a skilled writer and communication specialist who ensures our content is engaging
                    and easy to understand. Her love for storytelling brings clarity and connection to every article.{" "}
                    <br />
                    <br />
                    At TopGear Tents, we believe rooftop tents are more than just camping gear. They’re gateways to
                    adventure, freedom, and unforgettable memories. Our mission is to share valuable knowledge and
                    empower outdoor enthusiasts of all levels to make informed decisions, enhance their setups, and stay
                    inspired. <br />
                    <br />
                    Thank you for joining us on this journey. <br />
                    <br />
                    Let’s make every adventure count!
                  </p>
                </div>
              </>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
