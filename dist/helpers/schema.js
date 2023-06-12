"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
// var jsonSchema = Joi.object({
//   id: Joi.string().required(),
//   data_schema: Joi.object().required(),
//   router_config: Joi.object().required(),
//   status: Joi.string().required(),
//   created_by: Joi.string().required(),
//   updated_by: Joi.string().required(),
// });
var jsonSchema = Joi.object({
    id: Joi.string(),
    data_schema: Joi.object(),
    router_config: Joi.object(),
    status: Joi.string(),
    created_by: Joi.string(),
    updated_by: Joi.string()
});
exports.default = jsonSchema;
//# sourceMappingURL=schema.js.map