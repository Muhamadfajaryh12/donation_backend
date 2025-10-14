const nodemailer = require("nodemailer");
const response = require("../utils/Response");
require("dotenv").config();

class EmailController {
  async sendEmail({ to, subject, html }) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "fajaryudhistiraherjanto@gmail.com",
      to,
      subject,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new EmailController();
