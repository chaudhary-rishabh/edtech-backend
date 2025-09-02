import type { Request, Response } from 'express';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, number } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Email already registered' });
            return;
        }
        console.log("hashing password");
        const hashedPassword = await hashPassword(password);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            number
        });
        
        console.log("after hashing password");
        await user.save();
        console.log("after save");
        
        const token = generateToken({ userId: user._id });
        
        console.log("end before 201");
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        console.error("❌ Error in register route:", error);
        res.status(500).json({ success: false, message: 'Failed to update progress' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const token = generateToken({ userId: user._id });

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    // role: user.role
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};