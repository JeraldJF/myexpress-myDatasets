"use strict";
exports.__esModule = true;
var Joi = require("joi");
var jsonSchema = Joi.object({
    id: Joi.string().required(),
    data_schema: Joi.object().required(),
    router_config: Joi.object().required(),
    status: Joi.string().required(),
    created_by: Joi.string().required(),
    updated_by: Joi.string().required()
});
exports["default"] = jsonSchema;
