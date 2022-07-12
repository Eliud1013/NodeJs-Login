require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbHost: process.env.HOST,
  dbUser: process.env.DBUSER,
  dbPassword: process.env.DBPASSWORD,
  db: process.env.DATABASE,
  dbPort: process.env.DBPORT,
  secret: process.env.JWT_SECRET,
};
