const path = require("path");
const dotenv = require("dotenv");

// Specify the path to your .env file
const envFilePath = path.resolve(__dirname, "../.env");

// Load the .env file
dotenv.config({ path: envFilePath });

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  PORT,
};
