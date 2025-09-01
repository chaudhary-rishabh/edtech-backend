import mongoose, { Schema, Document } from 'mongoose';
import type { IDSASheet, IChapter, IProblem } from '../types/index.js';

const problemSchema = new Schema<IProblem>({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    youtubeLink: { type: String },
    leetcodeLink: { type: String },
    codeforcesLink: { type: String },
    articleLink: { type: String }
}, {
    timestamps: true
});

const chapterSchema = new Schema<IChapter>({
    chapterTitle: { type: String, required: true },
    problems: [problemSchema]
});

const dsaSheetSchema = new Schema<IDSASheet>({
    title: { type: String, required: true },
    chapters: [chapterSchema]
}, {
    timestamps: true
});

export const DSASheet = mongoose.model<IDSASheet>('DSASheet', dsaSheetSchema);
