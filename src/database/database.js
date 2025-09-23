require("dotenv").config();

const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected database");
});

connection.query = util.promisify(connection.query);

module.exports = connection;
