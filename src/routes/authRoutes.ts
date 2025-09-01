import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../utils/validator.js';
import { handleValidation } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, registerValidation, handleValidation, register);
router.post('/login', authLimiter, loginValidation, handleValidation, login);

export default router;
