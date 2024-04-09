import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
describe('Message Controller', () => {
    let createdMessageId;
    describe('sendMessage', () => {
        it('should send a message', (done) => {
            request(app)
                .post('/messages/newMessage')
                .send({
                subject: 'Test Subject',
                content: 'Test Content',
                sender: 'Test Sender',
                email: 'test@example.com',
                date: Date.now()
            })
                .expect(201)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('subject', 'Test Subject');
                // expect(res.body).to.have.property('content', 'Test Content');
                // expect(res.body).to.have.property('sender', 'Test Sender');
                // expect(res.body).to.have.property('email', 'test@example.com');
                createdMessageId = res.body._id;
                done();
            });
        });
    });
    describe('deleteMessage', () => {
        it('should delete a message by ID', (done) => {
            // Make sure to replace ':messageId' with a valid message ID in your database
            request(app)
                .delete(`/messages/deleteMessage/${createdMessageId}`)
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('message', 'Message deleted successfully');
                // Add more assertions as needed
                done();
            });
        });
    });
    describe('getAllMessages', () => {
        it('should get all messages', (done) => {
            request(app)
                .get('/messages/allMessages')
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('array');
                // done();
            });
        });
    });
    describe('getMessageById', () => {
        it('should get a message by ID', (done) => {
            request(app)
                .get(`/messages/${createdMessageId}`)
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
            });
        });
    });
});
