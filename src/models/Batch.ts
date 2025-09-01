import mongoose, { Schema, Document } from 'mongoose';
import type { IBatch } from '../types/index.js';

const batchSchema = new Schema<IBatch>({
    title: { type: String, required: true, trim: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    instructor: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
export const Batch = mongoose.model<IBatch>('Batch', batchSchema);