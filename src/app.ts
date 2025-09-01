import express from 'express';
import { helmetMiddleware, corsMiddleware, mongoSanitizeMiddleware, xssMiddleware } from './middleware/security.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import dsaRoutes from './routes/dsaRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitizeMiddleware);
app.use(xssMiddleware);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/public', publicRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

export default app;