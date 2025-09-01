import type { Request, Response } from 'express';
import { DSASheet } from '../models/DSASheet.js';
import { User } from '../models/User.js';

interface AuthRequest extends Request {
    user?: {
        _id: string;
        [key: string]: any;
    };
}

export const getDSASheets = async (req: Request, res: Response): Promise<void> => {
    try {
        const sheets = await DSASheet.find().select('title _id');

        res.json({
            success: true,
            data: { sheets }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get DSA sheets' });
    }
};

export const getDSASheetById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const sheet = await DSASheet.findById(id);

        if (!sheet) {
            res.status(404).json({ success: false, message: 'DSA sheet not found' });
            return;
        }

        const user = await User.findById(req.user!._id);
        const userProgress = user?.progress || [];

        const sheetWithProgress = {
            ...(sheet as any).toObject(),
            chapters: sheet.chapters?.map((chapter: any) => ({
                ...chapter,
                problems: chapter.problems.map((problem: any) => {
                    const progress = userProgress.find((p: any) =>
                        p.sheetId === id && p.problemId === problem._id.toString()
                    );
                    return {
                        ...problem,
                        status: progress?.status || 'pending'
                    };
                })
            }))
        };

        res.json({
            success: true,
            data: { sheet: sheetWithProgress }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get DSA sheet' });
    }
};

export const updateProblemProgress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { sheetId, problemId } = req.params;
        const { status } = req.body;

        // Validate parameters
        if (!sheetId || !problemId) {
            res.status(400).json({ success: false, message: 'Sheet ID and Problem ID are required' });
            return;
        }

        if (!['completed', 'pending'].includes(status)) {
            res.status(400).json({ success: false, message: 'Invalid status' });
            return;
        }

        const user = await User.findById(req.user!._id);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        // Ensure progress array exists
        if (!user.progress) {
            user.progress = [];
        }

        const existingProgressIndex = user.progress.findIndex((p: any) =>
            p.sheetId === sheetId && p.problemId === problemId
        );

        if (existingProgressIndex !== -1 && user.progress[existingProgressIndex]) {
            // Update existing progress
            user.progress[existingProgressIndex].status = status;
            user.progress[existingProgressIndex].updatedAt = new Date();
        } else {
            // Add new progress entry
            user.progress.push({
                sheetId,
                problemId,
                status,
                updatedAt: new Date()
            });
        }

        await (user as any).save();

        res.json({
            success: true,
            message: 'Progress updated successfully'
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update progress'
        });
    }
};