import mongoose, { Schema, Document } from 'mongoose';
import type { IFAQ } from '../types/index.js';

const faqSchema = new Schema<IFAQ>({
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, {
    timestamps: true
});
export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);