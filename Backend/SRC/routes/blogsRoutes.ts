// //const express = require('express');
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

import express from "express";
import blogController from '../controllers/blogsController.js';
const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Blogs
//  *   description: Blogs Endpoints
//  */

// /**
//  * @swagger
//  * /newBlog:
//  *   post:
//  *     summary: Create new Blog
//  *     tags: [Blogs]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Blog'
//  *     responses:
//  *       '201':
//  *         description: Successfully created new Blog
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Blog'
//  *       '400':
//  *         description: Bad request
//  *       '500':
//  *         description: Internal server error
//  */
/**
 * @openapi
 * /blogs/newBlog:
 *   post:
 *     tags:
 *       - Blogs
 *     description: Create a new blog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *       '401':
 *         description: Unauthorized - user authentication failed
 *       '500':
 *         description: Internal server error
 */
router.post('/newBlog', adminMiddleware, blogController.addBlog);
/**
 * @swagger
 * /blogs/allBlogs:
 *   get:
 *     summary: Get all Blogs
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */
router.get('/allBlogs', blogController.getAllBlogs);

/**
 * @swagger
 * /blogs/getBlog/{blogId}:
 *   get:
 *     summary: Get a specific blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.get('/getBlog/:blogId', adminMiddleware, blogController.getBlogById);

/**
 * @swagger
 * /blogs/editBlog/{blogId}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Successfully updated the blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.put('/editBlog/:blogId', adminMiddleware, blogController.updateBlog);

/**
 * @swagger
 * /blogs/deleteBlog/{blogId}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the blog
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/deleteBlog/:blogId', adminMiddleware, blogController.deleteBlog);

/**
 * @swagger
 * /blogs/addComment/{blogId}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content: 
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       '201':
 *         description: Successfully added the comment
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/addComment/:blogId/comments', authMiddleware, blogController.addCommentToBlog);

/**
 * @swagger
 * /blogs/addLike/{blogId}/like:
 *   post:
 *     summary: Add a like to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully added the like
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.post('/addLike/:blogId/like', authMiddleware, blogController.likeBlog);

/**
 * @swagger
 * /blogs/unLike/{blogId}/like/:
 *   delete:
 *     summary: Remove a like from a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to remove the like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully removed the like
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/unLike/:blogId/like/', authMiddleware, blogController.unlikeBlog);

/**
 * @swagger
 * /blogs/likeComment/{blogId}/{commentId}:
 *   post:
 *     summary: Like a comment
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog containing the comment
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to like
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully liked the comment
 *       '404':
 *         description: Blog or comment not found
 *       '500':
 *         description: Internal server error
 */
router.post('/likeComment/:blogId/:commentId', authMiddleware, blogController.likeComment);

/**
 * @swagger
 * /blogs/unlikeComment/{blogId}/{commentId}:
 *   delete:
 *     summary: Unlike a comment
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog containing the comment
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to unlike
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully unliked the comment
 *       '404':
 *         description: Blog or comment not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/unlikeComment/:blogId/:commentId', authMiddleware, blogController.unlikeComment);

/**
 * @swagger
 * /blogs/replyToComment/{blogId}/{commentId}:
 *   post:
 *     summary: Reply to a comment
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog containing the comment
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to reply to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - author
 *               - content
 *     responses:
 *       '201':
 *         description: Successfully replied to the comment
 *       '404':
 *         description: Blog or comment not found
 *       '500':
 *         description: Internal server error
 */
router.post('/replyToComment/:blogId/:commentId', authMiddleware, blogController.replyToComment);


export default router;