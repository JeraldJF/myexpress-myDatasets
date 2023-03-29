"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
var jsonSchema = Joi.object({
    id: Joi.string(),
    data_schema: Joi.object(),
    router_config: Joi.object(),
    status: Joi.string(),
    created_by: Joi.string(),
    updated_by: Joi.string(),
});
exports.default = jsonSchema;
//# sourceMappingURL=schema.js.map