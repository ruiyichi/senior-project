import * as dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.NODE_ENV === 'development' ? [
  process.env.DEV_SERVER_URI,
  process.env.DEV_FRONTEND_URI
] : [
  process.env.PROD_SERVER_URI,
  process.env.PROD_FRONTEND_URI
];

export default allowedOrigins;