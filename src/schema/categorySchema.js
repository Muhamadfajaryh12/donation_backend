const joi = require("joi");

class categorySchema {
  constructor() {
    this.category = joi.object({
      id: joi.number().optional(),
      category: joi.string().required(),
    });
  }
}

module.exports = new categorySchema();
