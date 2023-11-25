const path = require('path');
const dotenv = require('dotenv');

// Specify the path to your .env file
const envFilePath = path.resolve(__dirname, '../../.env');

// Load the .env file
dotenv.config({ path: envFilePath });

const jwtSecret = process.env.JWT_SECRET;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

module.exports = {
  jwtSecret,
  dbUser,
  dbPassword,
  jwtExpiresIn,
};