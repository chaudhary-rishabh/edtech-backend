import type { Request, Response } from 'express';
import { Course } from '../models/Course.js';

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const courses = await Course.find({ isActive: true });

        res.json({
            success: true,
            data: { courses }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get courses' });
    }
};

export const getCoursesByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;
        const courses = await Course.find({ category, isActive: true });

        res.json({
            success: true,
            data: { courses }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get courses by category' });
    }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }

        res.json({
            success: true,
            data: { course }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get course' });
    }
};
