const { Client } = require("pg");
const { dbUser, dbPassword } = require("../config");

// Create a single instance of the Client
const db = new Client({
  user: dbUser,
  host: "postgres",
  database: "postgres",
  password: dbPassword,
  port: 5432,
});

// Connect to the database during application initialization
db.connect()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application on connection failure
  });

module.exports = db;
