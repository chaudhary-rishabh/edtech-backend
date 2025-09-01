import mongoose, { Schema, Document } from 'mongoose';
import type { IUser, IProgress } from '../types/index.js';

const progressSchema = new Schema<IProgress>({
    sheetId: { type: String, required: true },
    problemId: { type: String, required: true },
    status: { type: String, enum: ['completed', 'pending'], default: 'pending' },
    updatedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    number: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin', 'instructor'], default: 'student' },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    progress: [progressSchema]
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);