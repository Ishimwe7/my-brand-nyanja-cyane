import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; // Import cookie-parser

const app = express();

app.use(cookieParser());

const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    //const authHeader = req.headers['cookie'];
    // console.log(req.cookies.jwt);
    // console.log(authHeader);
    let authHeader: any;
    authHeader = req.headers['cookie'];
    console.log(authHeader);
    // const jwt = req.cookies;
    // console.log(jwt.token);
    // const token = authHeader
    // && authHeader.split(' ')[1];
    // console.log(token);
    const parts = authHeader.split(';');

    // Extract the online part after '=' sign
    const token = parts[0].split('=')[1];
    //console.log(token);
    // const token = authHeader && authHeader.split(' ')[1];
    if (authHeader) {
        jwt.verify(token, "nyanja cyane secret", (err: any, decodedToken: any) => {
            if (err) {
                return res.json({ "Un authorized": "Un authorized access to this End point" });
            }
            else {
                //res.json({ "Token": decodedToken });
                //re.user = decodedToken;
                next();
            }
        })
    }
    else {
        res.json({ "Access denied": "Login first" })
    }
}

export default requireAuth;