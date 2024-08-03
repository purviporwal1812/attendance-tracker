const LocalStrategy = require("passport-local").Strategy;
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function initialize(passport) {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const results = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [email]
        );

        if (results.rows.length === 0) {
          return done(null, false, { message: "No user with that email" });
        }

        const user = results.rows[0];
        if (user.password === password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const results = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        id,
      ]);
      done(null, results.rows[0]);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
