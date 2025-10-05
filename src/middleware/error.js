const error = (err, req, res, next) => {
  console.log("error", err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};

module.exports = error;
