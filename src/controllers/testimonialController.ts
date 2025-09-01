import type { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial.js';

export const getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { testimonials }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get testimonials' });
    }
};