import mongoose, { Schema, Document } from 'mongoose';
import type { IStudentPlaced } from '../types/index.js';

const studentPlacedSchema = new Schema<IStudentPlaced>({
    studentName: { type: String, required: true },
    company: { type: String, required: true },
    package: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true }
}, {
    timestamps: true
});
export const StudentPlaced = mongoose.model<IStudentPlaced>('StudentPlaced', studentPlacedSchema);
