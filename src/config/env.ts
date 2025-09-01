import dotenv from 'dotenv';
dotenv.config();


export const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    NODE_ENV: process.env.NODE_ENV
} as const;

export type Config = typeof config;
