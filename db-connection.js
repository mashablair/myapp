import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// By creating a pool, we can reuse connections to the database instead of always opening and closing connections.
// This will improve performance once your app is hosted and you have a lot of users.
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

export default pool;
