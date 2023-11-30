const { Client } = require('pg');
const { dbUser, dbPassword } = require('../config');

const db = new Client({
  user: dbUser,
  host: 'postgres',
  database: 'postgres',
  password: dbPassword,
  port: 5432,
});

async function connectWithRetry(retries) {
  try {
    await db.connect();
    console.log('Connected to the database!');
  } catch (err) {
    console.error(err);
    console.log(`Retries left: ${retries}`);
    if (retries > 0) {
      // Wait 5 seconds before each retry
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Retry with reduced number of retries
      await connectWithRetry(retries - 1);
    } else {
      console.error('Max retries reached. Unable to connect to the database.');
      // You might want to handle this case, such as throwing an error or exiting the application
    }
  }
}

// Start the connection process with the maximum number of retries
connectWithRetry(5);



module.exports = db;