// app-test.js follows the tutorial
// https://youtu.be/Hej48pi_lOc
import express from "express";
import { getAllnotes, getNote, createNote } from "./db-queries.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;

// this will server static files (html/css/js) from 'public' folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "public", "create-note.html");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON request bodies
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("it is working, welcome to my app :)");
});

app.get("/notes", async (req, res, next) => {
  try {
    const notes = await getAllnotes();
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

app.get("/notes/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await getNote(id);
    if (!note) {
      res.send("This note does not exist");
      return;
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
});

// Serve index.html for /notes endpoint
app.get("/create-new-note", (req, res) => {
  res.sendFile(indexPath);
});

app.post("/create-new-note", async (req, res) => {
  console.log(req.body);
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

// Error handling middleware
app.use(async (error, req, res, next) => {
  console.error(error);
  res.status(500).send("Masha, there is Internal Server Error!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
