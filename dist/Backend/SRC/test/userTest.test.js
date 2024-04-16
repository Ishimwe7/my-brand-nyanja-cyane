import app from '../server.js';
import { expect } from 'chai';
import request from 'supertest';
describe('User Controller', () => {
    let createdUserId;
    describe('createNewUser', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/users/newUser')
                .send({
                names: 'Test User',
                email: 'test@example.com',
                password: 'StrongPassword123',
                isAdmin: false
            })
                .expect(201)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('names', 'Test User');
                createdUserId = res.body._id;
                done();
            });
        });
        // Add more test cases for edge cases like invalid input data, duplicate email, etc.
    });
    describe('updateUser', () => {
        it('should update an existing user', (done) => {
            request(app)
                .put(`/users/editUser/${createdUserId}`) // Replace '1' with the actual ID of an existing user
                .send({
                names: 'Updated User',
                email: 'updated@example.com',
                password: 'NewPassword123'
            })
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('names', 'Updated User');
                // expect(res.body).to.have.property('email', 'updated@example.com');
                // expect(res.body).to.have.property('password', 'NewPassword123');
                done();
            });
        });
        // Add more test cases for edge cases like updating with invalid data, user not found, etc.
    });
    describe('deleteUser', () => {
        let validUserId = 'valid_user_id'; // Replace with an existing user ID
        let invalidUserId = 'invalid_user_id'; // Replace with a non-existing or invalid user ID
        it('should delete an existing user', (done) => {
            request(app)
                .delete(`/users/${validUserId}`)
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // Add more assertions as needed
                done();
            });
        });
        it('should return an error if user ID is invalid', (done) => {
            request(app)
                .delete(`/users/deleteUser/${invalidUserId}`)
                .expect(404)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                //expect(res.body).to.have.property('message', "User not found ! Can't delete User");
                done();
            });
        });
    });
    describe('getAllUsers', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/users/allUsers')
                .expect(200)
                .end((err, res) => {
                //expect(res.body).to.be.an('array');
                done();
            });
        });
    });
    describe('getUserById', () => {
        let validUserId = 'valid_user_id'; // Replace with an existing user ID
        let invalidUserId = 'invalid_user_id'; // Replace with a non-existing or invalid user ID
        it('should get a user by ID', (done) => {
            request(app)
                .get(`/users/getUser/${validUserId}`)
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // Add more assertions as needed
                done();
            });
        });
        it('should return an error if user ID is invalid', (done) => {
            request(app)
                .get(`/users/getUser/${invalidUserId}`)
                .expect(404)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('error', 'User not found');
                done();
            });
        });
    });
    describe('login', () => {
        it('should login a user with correct credentials', (done) => {
            request(app)
                .post('/users/login')
                .send({
                email: 'test@example.com',
                password: 'StrongPassword123'
            })
                .expect(200)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('token');
                done();
            });
        });
        it('should return an error for invalid credentials', (done) => {
            request(app)
                .post('/users/login')
                .send({
                email: 'invalid@example.com',
                password: 'InvalidPassword123'
            })
                .expect(400)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Login Failed. Invalid Credentials! !');
                done();
            });
        });
        it('should return an error for missing email', (done) => {
            request(app)
                .post('/users/login')
                .send({
                password: 'StrongPassword123'
            })
                .expect(400)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
            });
        });
        it('should return an error for missing password', (done) => {
            request(app)
                .post('/users/login')
                .send({
                email: 'test@example.com'
            })
                .expect(400)
                .end((err, res) => {
                expect(res.body).to.be.an('object');
                done();
            });
        });
    });
});
