import mongoose, { Schema, Document } from 'mongoose';
import type { ITestimonial } from '../types/index.js';

const testimonialSchema = new Schema<ITestimonial>({
    userName: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, {
    timestamps: true
});

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
