//import chai from 'chai';
// import * as chai from 'chai'
// import chaiHttp from 'chai-http';
//import chai from 'chai';
//import chaiHttp from 'chai-http';
import app from '../server.js'; // Assuming your Express app is exported from app.js
// const expect = chai.expect;
// import express, { NextFunction, Request, Response } from 'express';
import { expect } from 'chai';
import request from 'supertest'
//chai.use(chaiHttp);

describe('User Controller', () => {
    let createdUserId: string;
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
                .end((err: any, res: any) => {
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
                .end((err: any, res: any) => {
                    expect(res.body).to.be.an('object');
                    // expect(res.body).to.have.property('names', 'Updated User');
                    // expect(res.body).to.have.property('email', 'updated@example.com');
                    // expect(res.body).to.have.property('password', 'NewPassword123');
                    done();
                });
        });

        // Add more test cases for edge cases like updating with invalid data, user not found, etc.
    });

    // Add tests for other user controller methods like deleteUser, getAllUsers, getUserById, login
});
