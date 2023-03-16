"use strict";
exports.__esModule = true;
var Joi = require("joi");
var jsonSchema = Joi.object({
    id: Joi.string().required(),
    data_schema: Joi.object(),
    router_config: Joi.object(),
    status: Joi.string(),
    created_by: Joi.string(),
    updated_by: Joi.string()
});
exports["default"] = jsonSchema;
