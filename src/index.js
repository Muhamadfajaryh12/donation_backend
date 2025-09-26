const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const app = express();

const PORT = process.env.PORT || 3002;
const version = "/api/v1/";

app.use(version, userRouter);
app.use(version, categoryRouter);

app.listen(PORT, () => {
  console.log(`localhost running on port ${PORT}`);
});
