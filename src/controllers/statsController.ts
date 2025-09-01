import type { Request, Response } from 'express';
import { Stats } from '../models/Stats.js';

export const getStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await Stats.findOne().sort({ lastUpdated: -1 });

        if (!stats) {
            res.status(404).json({ success: false, message: 'Stats not found' });
            return;
        }

        res.json({
            success: true,
            data: { stats }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get stats' });
    }
};
