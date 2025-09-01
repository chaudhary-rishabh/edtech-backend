import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const generateToken = (payload: object): string => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    //@ts-ignore
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: "1d",
    });
};

export const verifyToken = (token: string): any => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, config.JWT_SECRET);
};
