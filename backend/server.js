const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const Secret_key = process.env.SECRET_KEY;

let users = [];

// Register Api
app.post("/register", async (req, res) => {
  const { name, phone, email, password, company } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(404).json({ message: "User already exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const user = {
    id: users.length + 1,
    email,
    name,
    password: hashpassword,
    phone,
    company,
  };
  users.push(user);
  const token = jwt.sign({ id: user.id, email: user.email }, Secret_key, {
    expiresIn: "1h",
  });
  res.json({ token, message: "User Registered successfully" });
});

// Login Api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User Does not exists" });
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch)
    return res.status(400).json({ message: "Invalid Credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, Secret_key, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Private Api

app.get("/me", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, Secret_key, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const user = users.find((u) => u.id === decoded.id);
    res.json({ id: user.id, email: user.email, name: user.name });
  });
});

app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});
app.listen(process.env.PORT, () =>
  console.log(`Backend running on http://localhost:${process.env.PORT}`)
);
