import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
//import { describe } from 'node:test';
import userRoutes from './routes/usersRoutes.js';
import blogRoutes from './routes/blogsRoutes.js';
import messageRoutes from './routes/messagesRoutes.js';
import swaggerDocs from './utils/swagger.js';
import cookieParser from 'cookie-parser';
const app = express();
//export default app;
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<my_brand_db>?retryWrites=true&w=majority";
async function connect() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
}
app.use(cors());
app.use(express.json());
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use(cookieParser());
//app.use(cookieParser());
connect();
swaggerDocs(app, 8000);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
export default app;
