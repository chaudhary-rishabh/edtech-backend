import { Router } from 'express';
import { getAllTestimonials } from '../controllers/testimonialController.js';
import { getStats } from '../controllers/statsController.js';
import { getStudentsPlaced } from '../controllers/studentPlacedController.js';

const router = Router();

router.get('/testimonials', getAllTestimonials);
router.get('/stats', getStats);
router.get('/students-placed', getStudentsPlaced);

export default router;