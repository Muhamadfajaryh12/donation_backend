const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const campaignRouter = require("./routes/campaignRoute");
const dashboardRouter = require("./routes/dashboardRoute");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const errorMiddleware = require("./middleware/error");
const PORT = process.env.PORT || 3002;
const version = "/api/v1";
app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(version, userRouter);
app.use(version, categoryRouter);
app.use(version, campaignRouter);
app.use(version, dashboardRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`localhost running on port ${PORT}`);
});
