import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./utils.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(
  cors({
    origin: "*",
  })
);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.json({ data: "Hello" });
});

// Create an Account
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation checks
  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with user data and token
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { id: userId } = req.user; // Get user_id from the JWT token in req.user
  try {
    const isUser = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (isUser.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: isUser.rows[0], // Return only the user data
      message: "User retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login to the Account
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation checks
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    // Check if the user exists
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userResult.rows[0];

    // If no user found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with token and user info
    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add Note route
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags = [], isPinned = false } = req.body; // Default tags to empty array and isPinned to false
  const { id: user_id } = req.user; // Extract user_id from req.user, which comes from the JWT token

  // Validation for title and content
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    // Insert new note into the database, with user_id, title, content, tags, and isPinned
    const result = await db.query(
      `INSERT INTO notes (user_id, title, content, tags, isPinned) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, title, content, tags, isPinned]
    );

    // Respond with a success message and the newly added note
    res.status(201).json({
      success: true,
      message: "Note added successfully",
      note: result.rows[0],
    });
  } catch (err) {
    // Handle any errors during the database operation
    console.error("Error adding note:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Edit Note route
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const { noteId } = req.params; // Get the noteId from the URL parameter
  const { id: userId } = req.user; // Get user_id from the JWT token in req.user

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    // Ensure that the note belongs to the authenticated user
    const noteResult = await db.query(
      "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
      [noteId, userId]
    );

    if (noteResult.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found or you are not authorized to edit this note.",
      });
    }

    // Update the note
    const updatedNoteResult = await db.query(
      "UPDATE notes SET title = $1, content = $2, tags = $3, isPinned = $4 WHERE id = $5 RETURNING *",
      [title, content, tags, isPinned, noteId]
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNoteResult.rows[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get All Notes
app.get("/get-notes", authenticateToken, async (req, res) => {
  const { id: user_id } = req.user; // Extract user_id from req.user

  try {
    const notes = await db.query("SELECT * FROM notes WHERE user_id = $1", [
      user_id,
    ]);

    return res.json({
      error: false,
      notes: notes.rows, // Return only the rows of notes
      message: "All notes retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete Specific Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { id: user_id } = req.user; // Extract user_id from req.user
  const { noteId } = req.params; // Extract noteId from route params

  try {
    const result = await db.query(
      "DELETE FROM notes WHERE user_id = $1 AND id = $2",
      [user_id, noteId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: true,
        message: "Note not found or you are not authorized to delete this note",
      });
    }

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update isPinned Value
app.put(
  "/update-note-isPinned/:noteId",
  authenticateToken,
  async (req, res) => {
    const { isPinned } = req.body;
    const { noteId } = req.params; // Get the noteId from the URL parameter
    const { id: userId } = req.user; // Get user_id from the JWT token in req.user

    try {
      // Ensure that the note belongs to the authenticated user
      const noteResult = await db.query(
        "SELECT * FROM notes WHERE id = $1 AND user_id = $2",
        [noteId, userId]
      );

      if (noteResult.rows.length === 0) {
        return res.status(404).json({
          message:
            "Note not found or you are not authorized to update this note.",
        });
      }

      // Update the note with user_id condition
      const updatedNoteResult = await db.query(
        "UPDATE notes SET isPinned = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
        [isPinned, noteId, userId]
      );

      res.status(200).json({
        success: true,
        message: "Note updated successfully",
        note: updatedNoteResult.rows[0],
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));
