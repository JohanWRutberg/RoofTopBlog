import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namn, email, amne, meddelande } = req.body;

    console.log("Form data received:", { namn, email, amne, meddelande });

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
      to: "beatmastermind.aff@gmail.com",
      subject: amne,
      text: `Namn: ${namn}\nE-post: ${email}\nÄmne: ${amne}\nMeddelande: ${meddelande}`
    };

    try {
      // Skicka e-post
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: "E-post skickad framgångsrikt" });
    } catch (error) {
      console.error("Error sending email:", error); // Logga felet till konsolen
      res.status(500).json({ error: "Något gick fel" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
