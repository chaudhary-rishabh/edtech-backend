import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || '5000',
    MONGODB_URI: process.env.MONGODB_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    NODE_ENV: process.env.NODE_ENV || 'development'
} as const;

export type Config = typeof config;
