const joi = require("joi");

class userSchema {
  constructor() {
    this.loginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    this.registerSchema = joi.object({
      email: joi.string().email().required(),
      name: joi.string().required(),
      password: joi.string().required(),
    });
  }
}

module.exports = new userSchema();
