import Joi from 'joi';

export const createUserSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
}).options({ stripUnknown: true });
