import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, requires: true },
    imageUrl: { type: String, required: true },
    comments: { type: Array, default: [] },
    likes: { type: Number, default: 0 },
    creationDate: { type: Date, default: Date.now() },
    usersLiked: { type: Array, default: [] }
});
export default model("Blog", blogSchema);

//blog model