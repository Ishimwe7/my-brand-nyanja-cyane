// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

// Define the User interface
interface User extends Document {
    names: string;
    email: string;
    password: string;
    isAdmin: Boolean;
}

// Create a Mongoose schema using the User interface
const userSchema = new Schema({
    names: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

export default model("User", userSchema);
