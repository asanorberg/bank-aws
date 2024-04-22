import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, welcome to Money Bank!");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

let users = [];
let accounts = [];
let sessions = [];

// Create user endpoint (POST)
app.post("/users", (req, res) => {
  const { username, password } = req.body;

  const newUser = { id: users.length + 1, username, password };

  users.push(newUser);

  const newAccount = {
    id: accounts.length + 1,
    userId: newUser.id,
    balance: 0,
  };
  accounts.push(newAccount);

  res.status(201).json({ message: "User created successfully", user: newUser });
  console.log(
    "Received request to create user with username:",
    username,
    "and password:",
    password
  );
  console.log("User created:", newUser);
  console.log("Account created for user:", newAccount);
});

// Log in endpoint (POST)
app.post("/sessions", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    console.log("Invalid username or password:", username, password);
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const oneTimePassword = generateOTP();
  console.log("Generated OTP for user:", username, oneTimePassword);

  sessions.push({ userId: user.id, oneTimePassword });
  console.log("Session created for user:", username, oneTimePassword);

  res.status(200).json({ oneTimePassword });
});

// Show balance endpoint (POST)
app.post("/me/accounts", (req, res) => {
  console.log("Received request to fetch user data");

  const { otp } = req.body;
  console.log("Received OTP:", otp);

  const session = sessions.find((session) => session.oneTimePassword === otp);
  if (!session) {
    console.log("Session not found for OTP:", otp);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = users.find((user) => user.id === session.userId);
  console.log("User found:", user); //Loggar user data

  if (!user) {
    console.log("User not found for session:", session);
    return res.status(401).json({ message: "Unauthorized" });
  }

  const balance = 0; // Placeholder för balance

  res.json({ username: user.username, balance, userId: user.id });
});

// Deposit endpoint (POST)
app.post("/me/accounts/transactions", (req, res) => {
  const { oneTimePassword, depositAmount } = req.body;
  console.log(depositAmount);

  const session = sessions.find(
    (session) => session.oneTimePassword === oneTimePassword
  );

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const account = accounts.find((acc) => acc.userId === userId);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  account.balance += depositAmount;

  res
    .status(200)
    .json({ message: "Deposit successful", newBalance: account.balance });
});

// Starta servern
app.listen(port, () => {
  console.log(`Bank backend is running on http://localhost:${port}`);
});
