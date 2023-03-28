// app-test.js follows the tutorial
// https://youtu.be/Hej48pi_lOc
import express from "express";
import { getAllnotes, getNote, createNote } from "./db-queries.js";

const app = express();
const port = 8080;

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

app.post("/notes", async (req, res) => {
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
