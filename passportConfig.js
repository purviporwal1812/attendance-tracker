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
      
    })
  );

 
}

module.exports = initialize;
