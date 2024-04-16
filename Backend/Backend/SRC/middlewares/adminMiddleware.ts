import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; // Import cookie-parser

const app = express();

app.use(cookieParser());


declare module 'express' {
    interface Request {
        user?: any;
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, 'nyanja cyane secret', (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'You are not authorized to access this resource.' });
        }
        next();
    });
};

export default authenticateToken;