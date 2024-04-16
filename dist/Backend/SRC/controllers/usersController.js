import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
const age = Math.floor(Date.now() / 1000) + (60 * 60);
// interface User {
//     names: string;
//     email: string;
//     password: string;
//     isAdmin: boolean;
// }
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, 'nyanja cyane secret', { expiresIn: '1h' });
    return token;
};
const userController = {
    async createNewUser(req, res) {
        try {
            const { names, email, password, isAdmin } = req.body;
            if (!names || !email || !password)
                return res.status(400).json({ 'message': 'Both names, email and password are required!!' });
            if (!isValidEmail(email)) {
                return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' });
            }
            if (!isStrongPassword(password)) {
                return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' });
            }
            const duplicate = await User.findOne({ email: email }).exec();
            if (duplicate)
                return res.status(409).json({ "duplicateError": "Email already used!" });
            //const salt = await bcrypt.genSalt();
            // const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                names,
                email,
                password,
                isAdmin: false
            });
            await user.save();
            res.status(201).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async updateUser(req, res) {
        try {
            // const { id } = req.params;
            const { id, names, email, password, isAdmin } = req.body;
            if (!isValidEmail(email)) {
                return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' });
            }
            if (!isStrongPassword(password)) {
                return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' });
            }
            const user = await User.findByIdAndUpdate(id, { names, email, password, isAdmin }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async deleteUser(req, res) {
        try {
            //const { id } = req.params.userId;
            const { id, email, password } = req.body;
            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(404).json({ message: `User not found ! Can't delete User` });
            }
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('names email isAdmin');
            res.json(users);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async getUserById(req, res) {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Login Failed. Invalid Credentials! !' });
            }
            else {
                // const auth = await bcrypt.compare(password, user.password);
                if (password === user.password) {
                    // if(!user.isAdmin){
                    //     res.status(400).json("Unkown error");
                    // }
                    // const token = generateToken(user);
                    const token = jwt.sign({ id: user._id, username: user.names, isAdmin: user.isAdmin }, 'nyanja cyane secret', { expiresIn: '1h' });
                    //res.set('authorization', `${token}`); // Set the authorization header
                    console.log(`User login succes with id :" ${user._id} `);
                    //const decodedToken: JwtPayload = jwt.decode(token, { complete: true });
                    //const loggedUser = decodedToken.payload;
                    //res.cookie('token', token, { httpOnly: true });
                    // res.json({ token });
                    res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) }); // expires in 1 hour
                    res.setHeader('Authorization', `Bearer ${token}`);
                    return res.status(200).json({ "token": token });
                }
                else {
                    return res.status(400).json({ Error: 'Login Failed. Invalid Credentials!' });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async logout(req, res) {
        try {
            res.clearCookie('token');
            //const cookies = req.cookies;
            res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    async decodeToken(req, res) {
        try {
            const decodedToken = jwt.decode(req.body.token, { complete: true });
            if (!decodedToken) {
                return res.status(400).json({ message: 'Invalid token' });
            }
            const payload = decodedToken.payload;
            return res.json(payload);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};
export default userController;
