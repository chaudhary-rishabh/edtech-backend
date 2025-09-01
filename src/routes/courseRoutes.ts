import { Router } from 'express';
import { getAllCourses, getCoursesByCategory, getCourseById } from '../controllers/courseController.js';

const router = Router();

router.get('/', getAllCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/:id', getCourseById);

export default router;