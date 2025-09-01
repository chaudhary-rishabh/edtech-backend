import type { Request, Response } from 'express';
import { Batch } from '../models/Batch.js';

export const getLatestBatches = async (req: Request, res: Response): Promise<void> => {
    try {
        const batches = await Batch.find({ isActive: true })
            .populate('courseId')
            .sort({ startDate: -1 })
            .limit(10);

        res.json({
            success: true,
            data: { batches }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get batches' });
    }
};