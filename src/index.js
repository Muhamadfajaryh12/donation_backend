const express = require("express");
srequire("dotenv").config();

const userRouter = require("./routes/userRoute");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(userRouter);
app.listen(PORT, () => {
  console.log(`localhost running on port ${PORT}`);
});
