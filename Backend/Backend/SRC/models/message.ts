// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import joi from 'joi';

const messageSchema = new Schema({
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now() }
});

export default model("Message", messageSchema);