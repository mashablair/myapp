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
  })
  .promise();

export async function getAllnotes() {
  // this is destructuring, so it gets 1st item from the array which contains our data (2nd item is metadata)
  const [rows] = await pool.query("select * from notes");
  return rows;
}

// using '?' instead of the 'id' prevents sql injection attacks
// this 'id' value comes from user so can't be trusted!
export async function getNote(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM notes 
    WHERE id = ?`,
    [id]
  );

  return rows[0];
}

export async function createNote(title, content) {
  const [result] = await pool.query(
    `
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
  `,
    [title, content]
  );

  // result is not this new item that we just added to DB
  // result is a metadata about this item
  const id = result.insertId;
  console.log(result);

  // it's nice to get the newly created note as a result of this function
  return getNote(id);
}

// const notes = await getAllnotes();
// console.log(notes);

// const note = await getNote(3);
// console.log(note);

const newNote = await createNote("note name", "test description");
console.log(newNote);
