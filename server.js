const express = require("express");
const { Pool } = require("pg");
const passport = require("passport");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize Passport
const initializePassport = require("./passportConfig");
initializePassport(passport);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 1, 
  message: "You have already marked your attendance for this hour.",
});

const roomBounds = {
  minLat: 20.69991,
  maxLat: 24.699,
  minLon: 74.84089,
  maxLon: 78.837,
};

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/users/login", (req, res) => {
  res.send("Login Page"); 
});

app.get("/users/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Dashboard for: ${req.user.name}`);
  } else {
    res.redirect("/users/login");
  }
});

app.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/mark-attendance", limiter, async (req, res) => {
  const { name, rollNumber, lat, lon } = req.body;

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (
    latitude >= roomBounds.minLat &&
    latitude <= roomBounds.maxLat &&
    longitude >= roomBounds.minLon &&
    longitude <= roomBounds.maxLon
  ) {
    try {
      await pool.query(
        `INSERT INTO attendance (name, rollNumber, latitude, longitude) VALUES ($1, $2, $3, $4)`,
        [name, rollNumber, latitude, longitude]
      );
      res.send(`Attendance marked successfully for : ${name}`);
    } catch (err) {
      console.error("Error marking attendance", err.stack);
      res.status(500).send("Failed to mark attendance. Please try again.");
    }
  } else {
    res.send("Failed to mark attendance. You are not in the allowed area.");
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
