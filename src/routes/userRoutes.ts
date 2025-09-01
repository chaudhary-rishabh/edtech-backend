import { Router } from 'express';
import { getProfile, updateProfile, getPurchasedCourses } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { updateProfileValidation } from '../utils/validator.js';
import { handleValidation } from '../middleware/validation.js';

const router = Router();

router.use(authenticate);
router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, handleValidation, updateProfile);
router.get('/purchased-courses', getPurchasedCourses);

export default router;