require("dotenv").config();
const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, message } = job.data;

    const config = {
      service: "gmail",
      host: process.env.GMAIL_HOST,
      port: process.env.GMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    await transporter
      .sendMail({
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: subject,
        html: message,
      })
      .then(() => console.log("Email sent successfully to the " + email))
      .catch((error) => console.error("Error in sending email", error));
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
    removeOnComplete: true,
    removeOnFail: {
      count: 10, // Adjust based on your needs
      age: 1 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
  }
);
console.log("Worker started");
