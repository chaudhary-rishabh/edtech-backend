import dotenv from 'dotenv';

dotenv.config();


export const config = {
    PORT:'5000',
    MONGODB_URI: '',
    JWT_SECRET: '#',
    JWT_EXPIRES_IN: '7d',
    NODE_ENV: 'development'
} as const;

export type Config = typeof config;