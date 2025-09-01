import { Router } from 'express';
import { getDSASheets, getDSASheetById, updateProblemProgress } from '../controllers/dsaController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getDSASheets);
router.get('/:id', authenticate, getDSASheetById);
router.patch('/:sheetId/problems/:problemId/progress', authenticate, updateProblemProgress);

export default router;