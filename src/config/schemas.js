import Joi from 'joi';

const schemas = {
    userPost: Joi.object({
        login: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .required(),
        age: Joi.number().integer().min(4).max(130).required(),
    })
};

export default schemas;
