import express, { Request, Response } from 'express';
import Blog from '../models/Blog.js';
//const Comment = '../models/Comment.js');
import requireAuth from '../middlewares/authMiddleware.js';
import blogValidation from '../validations/blogValidations.js';
const router = express.Router();

const blogController = {
    async addBlog(req: Request, res: Response) {
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
                creationDate: Date.now()
            });
            await blog.save();
            res.status(201).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateBlog(req: Request, res: Response) {
        try {
            const id = req.params.blogId;
            // const { error, value } = await blogValidation.validateAsync(req.body);
            // if (error) {
            //     res.status(400).json(error);
            // }
            const { title, content, image, comments, likes } = req.body;
            const blog = await Blog.findByIdAndUpdate(id, { title, content, image, comments, likes }, { new: true });
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async deleteBlog(req: Request, res: Response) {
        try {
            const id = req.params.blogId;
            const todo = await Blog.findByIdAndDelete(id);
            if (!todo) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json({ message: 'Blog deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async getBlogById(req: Request, res: Response) {
        try {
            const blogId = req.params.blogId;
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            console.error('Error retrieving post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async addCommentToBlog(req: Request, res: Response) {
        try {
            const blogId = req.params.blogId;
            const { author, content } = req.body;
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
                addedDate: Date.now()
            };

            blog.comments.push(newComment);
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } catch (error) {
            console.error('Error adding comment to Blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // async replyToComment(req: Request, res: Response) {
    //     try {
    //         //const blogId = req.params.blogId;
    //         const { blogId, commentId, author, content } = req.body;
    //         const blog = await Blog.findById(blogId);
    //         if (!blog) {
    //             return res.status(404).json({ error: 'Blog not found' });
    //         }
    //         else {
    //             const comment = await blog.comments.find(comment: Comment => comment.id === commentId);
    //             const newReplyId = blog.replies.length + 1;
    //             const newComment = {
    //                 id: newReplyId,
    //                 author: author,
    //                 content: content,
    //             };

    //             blog.comments.push(newComment);
    //             const updatedBlog = await blog.save();
    //             res.json(updatedBlog);
    //         }
    //     } catch (error) {
    //         console.error('Error adding comment to Blogt:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },

    async likeBlog(req: Request, res: Response) {
        try {
            const blogId = req.params.blogId;

            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }

            blog.likes++;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } catch (error) {
            console.error('Error liking blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async unlikeBlog(req: Request, res: Response) {
        try {
            const blogId = req.params.blogId;

            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }

            if (blog.likes > 0) {
                blog.likes--;
            }
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } catch (error) {
            console.error('Error unliking blog:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

//export default router;
export default blogController;
