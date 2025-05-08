import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const BACKEND_URL = process.env.BACKEND_URL;