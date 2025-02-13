import { schedule } from '@netlify/functions'
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Get environment variables
dotenv.config();
const { CRON, MAILER_TO, MAILER_FROM, MAILER_PASS, ENDPOINT, TIMEOUT_LIMIT: timeoutLimit } = process.env;
const TIMEOUT_LIMIT = Number(timeoutLimit);

export const handler = schedule(`${CRON}`, async (event: any) => {
  const requestTimestamp = new Date();

  async function sendEmail(subject, body) {
    let transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      auth: {
        user: MAILER_FROM,
        pass: MAILER_PASS,
      },
    });
  
    let mailOptions = {
      from: MAILER_FROM,
      to: MAILER_TO,
      subject: subject,
      text: body,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
  try {
    const response = await axios.get(`${ENDPOINT}`, { timeout: TIMEOUT_LIMIT });
    const responseTimestamp = new Date().getTime() - requestTimestamp.getTime();
    const body = `Sales Saver Relay status: ${response.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
    await sendEmail("Sales Saver Relay is working", body);
    console.log(body);
    return { statusCode: response.status, body: body };
  } catch (error) {
    const responseTimestamp = new Date().getTime() - requestTimestamp.getTime();
    const subject = 'Sales Saver Relay not responding';
    const body = `Sales Saver Relay status: ${error.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
    await sendEmail(subject, body);
    console.log(body);
    return { statusCode: error.status, body: body };
  }
});