// import { schedule } from '@netlify/functions'

// export const handler = schedule('* * * * *', async (event: any) => {
//   const timestamp = new Date().toISOString();
//   console.log(`Hello from monitor @ ${timestamp}`);
//   return {
//     statusCode: 200,
//     body: `Hello from monitor @ ${timestamp}`
//   }
// });

// TEST FUNCTION
// export const handler = async (event: any, context: any) => {
//   const timestamp = new Date().toISOString();
//   console.log(`Hello from monitor @ ${timestamp}`);
//   return {
//     statusCode: 200,
//     body: `Hello from monitor @ ${timestamp}`
//   }
// };