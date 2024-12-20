import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    /* console.log("Form data received:", { name, email, subject, message }); */

    // Konfigurera Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    // E-postinnehåll
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_ADDRESS,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    };

    try {
      // Skicka e-post
      await transporter.sendMail(mailOptions);
      /* console.log("Email sent successfully"); */
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error); // Logga felet till konsolen
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
