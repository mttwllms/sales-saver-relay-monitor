import { schedule } from '@netlify/functions'
import axios from "axios";
// import dotenv from "dotenv";

// Get environment variables
// dotenv.config();
// const { TIMEOUT_LIMIT, MAILER_TO, MAILER_FROM, MAILER_PASS, ENDPOINT } = process.env;

export const handler = schedule('* * * * *', async (event: any) => {
  const requestTimestamp = new Date();
  try {
    const response = await axios.get('https://rio-dev.sportsbasement.com/ss', { timeout: 5000 });
    const responseTimestamp = requestTimestamp.getTime() - new Date().getTime();
    const body = `Sales Saver Relay status: ${response.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
    console.log(body);
    return { statusCode: response.status, body: body };
  } catch (error) {
    // const subject = 'Sales Saver relay not responding';
    // const body = `Sales Saver relay is not responding at ${timestamp}:\n\n${error.status}\n${error.code}\n${error.message}`;
    // await sendEmail(subject, body);
    const responseTimestamp = requestTimestamp.getTime() - new Date().getTime();
    const body = `Sales Saver Relay status: ${error.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
    console.log(body);
    return { statusCode: error.status, body: body };
  }
});



// TEST FUNCTION
// export const handler = async (event: any, context: any) => {
//   const requestTimestamp = new Date();
//   try {
//     const response = await axios.get('https://rio-dev.sportsbasement.com/ss', { timeout: 5000 });
//     const responseTimestamp = requestTimestamp.getTime() - new Date().getTime();
//     const body = `Sales Saver Relay status: ${response.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
//     return { statusCode: response.status, body: body };
//   } catch (error) {
//     // const subject = 'Sales Saver relay not responding';
//     // const body = `Sales Saver relay is not responding at ${timestamp}:\n\n${error.status}\n${error.code}\n${error.message}`;
//     // await sendEmail(subject, body);
//     const responseTimestamp = requestTimestamp.getTime() - new Date().getTime();
//     const body = `Sales Saver Relay status: ${error.status} at ${requestTimestamp} in ${responseTimestamp}ms`;
//     return { statusCode: error.status, body: error.message };
//   }
// };