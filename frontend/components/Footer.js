import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container flex flex-sb flex-wrap flex-left">
          <div className="footer_logo">
            <Link href="/">
              <img src="/img/logo_2.PNG" alt="logo" width={150} height={100} />
            </Link>
            <h4>&copy; 2024 All Rights Reserved.</h4>
            <h3>
              Coded By <span>@JRcoder</span>
            </h3>
          </div>
          <div className="q_links">
            <h3>Legal Stuff Links</h3>
            <ul>
              <li>
                <Link href="/">Privacy Notice</Link>
              </li>
              <li>
                <Link href="/">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/">Terms Of Use</Link>
              </li>
            </ul>
          </div>
          <div className="q_links">
            <h3>Social Media</h3>
            <ul>
              <li>
                <Link href="/">Instagram</Link>
              </li>
              <li>
                <Link href="/">Pinterest</Link>
              </li>
              <li>
                <Link href="/">Facebook</Link>
              </li>
            </ul>
          </div>
          <div className="q_links affiliate_disclosure">
            <h3>Affiliate Disclosure</h3>
            <p>
              As an Amazon Associate, we earn from qualifying purchases. This means that if you click on a link to an
              Amazon product on this site and make a purchase, we may receive a commission at no additional cost to you.
              This helps support the site and allows us to continue providing useful content. Thank you for your
              support!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
