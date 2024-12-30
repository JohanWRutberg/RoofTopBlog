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
                    Welcome to <b>TopGear Tents</b>, your ultimate resource for everything related to vehicle-based
                    camping and tent solutions. From rooftop tents to hitch-mounted awnings, pop-up tents, and all the
                    accessories that make camping more comfortable, we’re here to inspire and equip adventurers of all
                    levels.
                    <br />
                    Whether you’re a seasoned overlander or just starting to explore the joys of vehicle camping, our
                    goal is to guide you with expert tips, detailed reviews, and insightful advice to enhance your
                    outdoor experiences.
                    <br />
                    The team behind TopGear Tents is united by a shared passion for adventure and expertise in their
                    fields: <br />
                    <br />
                    &#9750; <b>Johan,</b> a software developer and test engineer, pairs his technical knowledge with
                    years of outdoor experience. His enthusiasm for rooftop and vehicle tents drives him to deliver
                    accurate and practical recommendations. <br />
                    <br />
                    &#9750; <b>Pernilla,</b> a talented writer and communication specialist, crafts engaging and
                    informative content. Her storytelling skills help connect readers to the excitement and
                    possibilities of vehicle camping. <br />
                    <br />
                    At TopGear Tents, we believe that vehicle tents are more than just camping gear. They’re gateways to
                    adventure, freedom, and unforgettable memories. Whether you’re looking for the perfect rooftop tent,
                    exploring innovative accessories, or seeking advice to enhance your camping setup, we’re here to
                    help. <br />
                    <br />
                    Thank you for joining us on this journey. <br />
                    <br />
                    Together, let’s make every adventure unforgettable!
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
