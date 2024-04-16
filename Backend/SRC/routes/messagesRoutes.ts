// const express = require('express');
// const router = express.Router();
import express from "express";
const router = express.Router();
import messageController from '../controllers/messagesController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages endpoints
 */

/**
 * @swagger
 * /messages/newMessage/:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       '201':
 *         description: Successfully send Message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/newMessage/', messageController.sendMessage);
/**
 * @swagger
 * /messages/allMessages:
 *   get:
 *     summary: View All Messages
 *     tags: [Messages]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error
 */
router.get('/allMessages/', adminMiddleware, messageController.getAllMessages);

/**
 * @swagger
 * /messages/getMessage/{messageId}/:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: ID of the message to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */
router.get('/getMessage/:messageId/', adminMiddleware, messageController.getMessageById);

/**
 * @swagger
 * /messages/deleteMessage/{messageId}:
 *   delete:
 *     summary: Delete a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: ID of the message to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the message
 *       '404':
 *         description: Message not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/deleteMessage/:messageId/', adminMiddleware, messageController.deleteMessage);

export default router;