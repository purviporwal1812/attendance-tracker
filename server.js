const express = require("express");
const { pool } = require("./dbconfig");
const passport = require("passport");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 1, // Limit each user to 1 request per windowMs
  message: "You have already marked your attendance for this hour.",
});
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  res.render("dashboard.ejs", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

const roomBounds = {
  minLat: 20.69991,
  maxLat: 24.699,
  minLon: 74.84089,
  maxLon: 78.837,
};
app.post("/mark-attendance", limiter, (req, res) => {
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
      const insertAttendance = pool.query(
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
