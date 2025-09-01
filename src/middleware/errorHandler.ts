import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal server error';

    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation error';
    }

    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    if (error.name === 'MongoServerError' && (error as any).code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value';
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};