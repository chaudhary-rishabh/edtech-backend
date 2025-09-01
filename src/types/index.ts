// types/index.ts - Fixed Types
import { Types } from 'mongoose';

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    number: string;
    role: 'student' | 'admin' | 'instructor';
    purchasedCourses: Types.ObjectId[];
    progress: IProgress[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProgress {
    sheetId: string;
    problemId: string;
    status: 'completed' | 'pending';
    updatedAt: Date;
}

export interface ICourse {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBatch {
    _id?: Types.ObjectId;
    title: string;
    courseId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    instructor: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudentPlaced {
    _id?: Types.ObjectId;
    studentName: string;
    company: string;
    package: string;
    courseId: Types.ObjectId;
    batchId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDSASheet {
    _id?: Types.ObjectId;
    title: string;
    chapters: IChapter[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChapter {
    chapterTitle: string;
    problems: IProblem[];
}

export interface IProblem {
    _id: Types.ObjectId;
    title: string;
    level: 'Easy' | 'Medium' | 'Hard';
    youtubeLink?: string;
    leetcodeLink?: string;
    codeforcesLink?: string;
    articleLink?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Additional interfaces
export interface IFAQ {
    _id?: Types.ObjectId;
    question: string;
    answer: string;
    createdAt?: Date;
}

export interface ITestimonial {
    _id?: Types.ObjectId;
    userName: string;
    message: string;
    rating: number;
    createdAt?: Date;
}

export interface IStats {
    _id?: Types.ObjectId;
    totalStudents: number;
    totalCourses: number;
    studentsPlaced: number;
    lastUpdated?: Date;
}