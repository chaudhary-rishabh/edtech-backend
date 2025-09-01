import mongoose, { Schema, Document } from 'mongoose';
import type { IStats } from '../types/index.js';

const statsSchema = new Schema<IStats>({
    totalStudents: { type: Number, required: true, min: 0 },
    totalCourses: { type: Number, required: true, min: 0 },
    studentsPlaced: { type: Number, required: true, min: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

export const Stats = mongoose.model<IStats>('Stats', statsSchema);
