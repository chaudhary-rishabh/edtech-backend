import { Router } from 'express';
import { getLatestBatches } from '../controllers/batchController.js';

const router = Router();

router.get('/latest', getLatestBatches);

export default router;