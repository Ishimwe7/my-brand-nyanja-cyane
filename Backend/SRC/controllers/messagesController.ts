import express, { Request, Response } from 'express';
import Message from '../models/message.js';
import requireAuth from '../middlewares/authMiddleware.js';
const router = express.Router();
import messageValidation from '../validations/messagesValidations.js';

const messageController = {
    async sendMessage(req: Request, res: Response) {
        try {
            const { error, value } = await messageValidation.validateAsync(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { subject, content, sender, email } = req.body;
            const message = new Message({
                subject,
                content,
                sender,
                email,
                date: Date.now()
            });
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },


    async deleteMessage(req: Request, res: Response) {
        try {
            const id = req.params.messageId;
            const message = await Message.findByIdAndDelete(id);
            //console.log(message);
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }
            res.json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getAllMessages(req: Request, res: Response) {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async getMessageById(req: Request, res: Response) {
        try {
            const messageId = req.params.messageId;
            const message = await Message.findById(messageId);
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }
            res.json(message);
        } catch (error) {
            console.error('Error retrieving post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

//export default router;
export default messageController;
