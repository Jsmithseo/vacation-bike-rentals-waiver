const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer();
require("dotenv").config();

const router = express.Router();

router.post("/send-waiver-email", upload.single("pdf"), async (req, res) => {
  try {
    const { userEmail, formFields } = req.body;
    const pdfBuffer = req.file.buffer;
    const data = JSON.parse(formFields);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlSummary = `
      <h2>New Waiver Submission</h2>
      <p><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Rental Date:</strong> ${data.rentalDate}</p>
      <p><strong>DOB:</strong> ${data.dob}</p>
      <p><strong>Helmet Size:</strong> ${data.helmetsize}</p>
      <p><strong>Medical Conditions:</strong> ${data.medicalconditions}</p>
      <p><strong>Other Notes:</strong> ${data.otherNotes}</p>
    `;

    const mailOptions = {
      from: `"Vacation Bike Rentals" <${process.env.EMAIL_USER}>`,
      to: `${userEmail}, ${process.env.EMAIL_TO}`,
      subject: "Vacation Bike Waiver Submission",
      html: htmlSummary,
      attachments: [
        {
          filename: "waiver.pdf",
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent." });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send waiver email." });
  }
});

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb', // or higher if needed
      },
    },
  };
  
module.exports = router;
