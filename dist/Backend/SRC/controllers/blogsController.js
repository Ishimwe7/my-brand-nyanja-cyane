import express from 'express';
import Blog from '../models/Blog.js';
import blogValidation from '../validations/blogValidations.js';
const router = express.Router();
const blogController = {
    async addBlog(req, res) {
        try {
            const { error, value } = await blogValidation.validateAsync(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
                // res.status(400).json(error);
            }
            const { title, content, imageUrl } = req.body;
            const blog = new Blog({
                title,
                content,
                imageUrl,
                comments: [],
                likes: 0,
                usersLiked: [],
                creationDate: Date.now()
            });
            await blog.save();
            res.status(201).json(blog);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async updateBlog(req, res) {
        try {
            const id = req.params.blogId;
            const { title, content, image, comments, likes } = req.body;
            const blog = await Blog.findByIdAndUpdate(id, { title, content, image, comments, likes }, { new: true });
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(blog);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async deleteBlog(req, res) {
        try {
            const id = req.params.blogId;
            const todo = await Blog.findByIdAndDelete(id);
            if (!todo) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json({ message: 'Blog deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getAllBlogs(req, res) {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getBlogById(req, res) {
        try {
            const blogId = req.params.blogId;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            res.json(blog);
        }
        catch (error) {
            console.error('Error retrieving post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async addCommentToBlog(req, res) {
        try {
            const blogId = req.params.blogId;
            // const { author, content } = req.body;
            const content = req.body.content;
            const author = req.body.author;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            const newCommentId = blog.comments.length + 1;
            const newComment = {
                id: newCommentId,
                author: author, // Assuming author is the ID of the user who posted the comment
                content: content,
                likes: 0,
                replies: [],
                usersLiked: [],
                addedDate: Date.now()
            };
            blog.comments.push(newComment);
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
        catch (error) {
            console.error('Error adding comment to Blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async replyToComment(req, res) {
        try {
            const { blogId, commentId, author, content } = req.body;
            // Find the blog
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            const comment = blog.comments.find(comment => comment.id == commentId);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            const newReplyId = blog.comments.length + 1;
            const newReply = {
                id: newReplyId,
                author: author,
                content: content,
                likes: 0,
                addedDate: Date.now()
            };
            // Add the reply to the comment
            comment.replies.push(newReply);
            // Save the updated blog
            await blog.save();
            res.json(blog);
        }
        catch (error) {
            console.error('Error replying to comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async likeBlog(req, res) {
        try {
            //console.log("Hello Sir" + req.user.id);
            const blogId = req.params.blogId;
            const userId = req.user.id;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            if (blog.usersLiked.includes(userId)) {
                return res.status(400).json({ error: 'User has already liked this blog' });
            }
            blog.usersLiked.push(userId);
            blog.likes++;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
        catch (error) {
            console.error('Error liking blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async unlikeBlog(req, res) {
        try {
            // console.log("Hello Sir" + req.user.id);
            const blogId = req.params.blogId;
            const userId = req.user.id;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            if (blog.likes > 0) {
                if (!blog.usersLiked.includes(userId)) {
                    return res.status(400).json({ error: 'User has not liked this blog' });
                }
                const userIndex = blog.usersLiked.indexOf(userId);
                blog.usersLiked.splice(userIndex, 1);
                blog.likes--;
            }
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        }
        catch (error) {
            console.error('Error unliking blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async likeComment(req, res) {
        try {
            const { blogId, commentId } = req.params;
            const userId = req.user.id;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            const comment = blog.comments.find(comment => comment.id == commentId);
            console.log(blog.comments[0].id + " " + commentId);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            if (comment.usersLiked.includes(userId)) {
                return res.status(400).json({ error: 'User has already liked this comment' });
            }
            const updatedComments = blog.comments.map((commentItem) => {
                if (commentItem.id == commentId) {
                    // Increment likes and add user to liked users
                    console.log("Comment found");
                    return {
                        ...commentItem,
                        likes: commentItem.likes + 1,
                        usersLiked: [...commentItem.usersLiked, userId]
                    };
                }
                return commentItem;
            });
            console.log(updatedComments);
            blog.comments = updatedComments;
            // comment.usersLiked.push(userId);
            // comment.likes++;
            // console.log(comment);
            //const updatedBlog = await blog.save();
            await blog.save();
            res.json(blog);
        }
        catch (error) {
            console.error('Error liking comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async unlikeComment(req, res) {
        try {
            const { blogId, commentId } = req.params;
            const userId = req.user.id;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            const comment = blog.comments.find(comment => comment.id == commentId);
            if (!comment) {
                console.log(blogId + " " + commentId);
                return res.status(404).json({ error: 'Comment not found ' });
            }
            if (!comment.usersLiked.includes(userId)) {
                return res.status(400).json({ error: 'User has not liked this comment' });
            }
            const userIndex = comment.usersLiked.indexOf(userId);
            comment.usersLiked.splice(userIndex, 1);
            comment.likes--;
            const updatedBlog = await blog.save();
            // await blog.save();
            res.json(updatedBlog);
        }
        catch (error) {
            console.error('Error unliking comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
//export default router;
export default blogController;
