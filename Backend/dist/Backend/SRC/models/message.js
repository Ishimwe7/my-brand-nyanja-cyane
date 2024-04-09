import { Schema, model } from 'mongoose';
const messageSchema = new Schema({
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});
export default model("Message", messageSchema);
