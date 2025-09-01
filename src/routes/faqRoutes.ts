import { Router } from 'express';
import { getAllFAQs } from '../controllers/faqController.js';

const router = Router();

router.get('/', getAllFAQs);

export default router;