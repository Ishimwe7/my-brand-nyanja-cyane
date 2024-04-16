import { expect } from 'chai';
import request from 'supertest'
import app from '../server.js';


describe('Blog Controller', () => {
    let previousLikes: number;
    let createdBlogId: any;
    //this.timeout(5000);
    describe('addBlog', () => {
        it('should add a new blog', (done) => {
            request(app)
                .post('/blogs/newBlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    g')
                .send({
                    title: 'Test Blog',
                    content: 'This is a test blog content',
                    imageUrl: 'https://example.com/image.jpg',
                    comments: [],
                    likes: 0
                })
                .expect(201)
                .timeout(5000)
                .end((err: any, res: any) => {
                    expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.property('title', 'Test Blog');
                    // expect(res.body).to.have.property('content', 'This is a test blog content');
                    // expect(res.body).to.have.property('imageUrl', 'https://example.com/image.jpg');
                    createdBlogId = res.body._id;
                    done();
                });
        });
    });

    describe('updateBlog', () => {
        it('should update an existing blog', (done) => {
            request(app)
                .put(`/blogs/editBlog/${createdBlogId}`)
                .send({
                    title: 'Updated Blog',
                    content: 'This is updated content',
                    imageUrl: 'https://example.com/updated-image.jpg'
                })
                .expect(200)
                .timeout(5000)
                .end((err: any, res: any) => {
                    expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.property('title', 'Updated Blog');
                    // expect(res.body).to.have.property('content', 'This is updated content');
                    // expect(res.body).to.have.property('imageUrl', 'https://example.com/updated-image.jpg');
                    done();
                });
        });
    });

    it('should delete an existing blog', (done) => {

        request(app)
            .delete(`/blogs/deleteBlog/${createdBlogId}`)
            .expect(200)
            .end((err: any, res: any) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('message', 'Blog deleted successfully');
                done();
            });
    });

    // it('should return all blogs', (done) => {
    //     request(app)
    //         .get('/blogs/allBlogs')
    //         .expect(200)
    //         .timeout(5000)
    //         .end((err: any, res: any) => {
    //             // expect(res.body).to.be.an('array');
    //             done();
    //         });
    // });

    it('should return a single blog by ID', (done) => {
        request(app)
            .get(`/blogs/getBlog/${createdBlogId}`)
            .expect(200)
            .end((err: any, res: any) => {
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should add a comment to a blog', (done) => {
        request(app)
            .post(`/blogs/addComment/${createdBlogId}/comments`)
            .send({
                id: 1,
                author: 'Test User',
                content: 'This is a test comment',
                likes: 0,
                replies: [],
                addedDate: Date.now()
            })
            .expect(200)
            .end((err: any, res: any) => {
                //expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should increment the likes of a blog', (done) => {
        request(app)
            .put(`/blogs/addLike/${createdBlogId}/like`)
            .expect(200)
            .end((err: any, res: any) => {
                previousLikes = res.body.likes;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should decrement the likes of a blog', (done) => {
        request(app)
            .put(`/blogs/unLike/${createdBlogId}/unlike`)
            .expect(200)
            .end((err: any, res: any) => {
                expect(res.body).to.be.an('object');
                done();
            });
    });

});