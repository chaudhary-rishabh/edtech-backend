import type { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';

interface AuthRequest extends Request {
    user?: any;
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        res.json({
            success: true,
            data: { user }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get profile' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, number } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, number },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
};

export const getPurchasedCourses = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user._id).populate('purchasedCourses');

        res.json({
            success: true,
            data: { courses: user?.purchasedCourses || [] }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get purchased courses' });
    }
};