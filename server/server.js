import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./utils";

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

// Add Notes
app.post("/add", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    res.status(400).json({ error: true, message: "Title is required" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
