import mongoose, { Schema, Document } from 'mongoose';
import type { ICourse } from '../types/index.js';

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
export const Course = mongoose.model<ICourse>('Course', courseSchema);