import type { Request, Response } from 'express';
import { FAQ } from '../models/FAQ.js';

export const getAllFAQs = async (req: Request, res: Response): Promise<void> => {
    try {
        const faqs = await FAQ.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { faqs }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get FAQs' });
    }
};