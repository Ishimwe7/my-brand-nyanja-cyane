import Joi from '@hapi/joi';

const messageValidationSchema = Joi.object({
    subject: Joi.string().required(),
    content: Joi.string().required(),
    sender: Joi.string().required(),
    email: Joi.string().email().required(),
    date: Joi.date().default(Date.now())
});

//const { error, value } = messageValidationSchema.validate();

export default messageValidationSchema;