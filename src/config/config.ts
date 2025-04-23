import dotenv from "dotenv";

dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET as string,
  mongoUri: process.env.MONGODB_URI as string,
  port: process.env.PORT || 5000,
};

export default config;
