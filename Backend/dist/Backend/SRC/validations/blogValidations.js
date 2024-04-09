import joi from '@hapi/joi';
const blogValidationSchema = joi.object({
    _id: joi.string().optional(),
    title: joi.string().required(),
    content: joi.string().required(),
    imageUrl: joi.string().required(),
    comments: joi.array(),
    likes: joi.number()
});
//console.log(blogValidationSchema);
export default blogValidationSchema;
