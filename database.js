import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllnotes() {
  // this is destructuring, so it gets 1st item from the array which contains our data (2nd item is metadata)
  const [rows] = await pool.query("select * from notes");
  return rows;
}

const notes = await getAllnotes();
console.log(notes);
