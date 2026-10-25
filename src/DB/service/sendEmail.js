import { randomInt } from "node:crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kholoudhamdy00@gmail.com",
    pass: "sooflasoxbhlnzoc",
  },
});

export const sendEmail = async ({
  to,
  subject,
  html = "",
  attachment = [],
}) => {
  const info = await transporter.sendMail({
    from: `"kholoud" <kholoudhamdy00@gmail.com>`,
    to,
    subject,
    html,
    attachment,
  });
  return info;
};
export const generate_otp = async () => {
  return randomInt(100000, 1000000).toString();
};
