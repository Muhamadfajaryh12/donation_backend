const joi = require("joi");

const campaignSchema = joi.object({
  id: joi.number().integer().optional(),
  title: joi.string().required(),
  location: joi.string().required(),
  image: joi.string().required(),
  desription: joi.string().required(),
  amount: joi.number().integer().required(),
  expired_date: joi.date().required(),
  status: joi.string().required(),
  category_id: joi.number().integer().required(),
  user_id: joi.number().integer().required(),
});

module.exports = campaignSchema;
