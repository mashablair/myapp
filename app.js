// this app.js file is created with chat-gpt.4 help
// they listen on different ports so there is no conflict

import express, { json } from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// Sample user data
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Alice" },
  { id: 4, name: "Bob" },
];

app.get("/", async (req, res) => {
  res.send("Hello, Express.js v5 with async error handling and more routes!");
});

app.get("/error", async (req, res, next) => {
  try {
    // Simulate an error
    throw new Error("An unexpected error occurred!");
  } catch (error) {
    next(error);
  }
});

app.get("/users", async (req, res) => {
  res.json(users);
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use(async (error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
