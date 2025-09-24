const response = (res, status, message, data = null) => {
  const response = {
    status: status,
    message: message,
  };

  if (data) {
    response.data = data;
  }

  return res.status(status).json(response);
};

module.exports = response;
