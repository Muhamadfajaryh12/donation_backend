const express = require("express");
const { default: database } = require("./database/database");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`localhost running on port ${PORT}`);
});
