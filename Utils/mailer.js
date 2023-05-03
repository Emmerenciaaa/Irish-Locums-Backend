import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // host: "mail.openjavascript.info",
  port: 465,
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      from: process.env.EMAIL_ADD,
      subject: "LOCCUM CHANGE PASSWORD",
    });
    return info;
  } catch (er) {
    console.log(er);
  }
};
