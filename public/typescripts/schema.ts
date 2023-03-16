const Joi = require("joi");

var jsonSchema = Joi.object({
  id: Joi.string().required(),
  data_schema: Joi.object(),
  router_config: Joi.object(),
  status: Joi.string(),
  created_by: Joi.string(),
  updated_by: Joi.string(),
});



export default jsonSchema;