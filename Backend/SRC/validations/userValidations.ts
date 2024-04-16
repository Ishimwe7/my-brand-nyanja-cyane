import joi from '@hapi/joi';

const userValidationSchema = joi.object({
    names: joi.string().required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    isAdmin: joi.boolean().required()
});

export default userValidationSchema;