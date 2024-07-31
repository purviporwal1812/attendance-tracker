const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbconfig");

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
          // Compare plain text passwords
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
