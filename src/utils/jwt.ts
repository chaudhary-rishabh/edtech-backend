import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (payload: object): string => {
    //@ts-ignore
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, config.JWT_SECRET);
};