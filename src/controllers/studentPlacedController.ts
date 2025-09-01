import type { Request, Response } from 'express';
import { StudentPlaced } from '../models/StudentPlaced.js';

export const getStudentsPlaced = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await StudentPlaced.find()
            .populate('courseId batchId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { students }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get students placed' });
    }
};