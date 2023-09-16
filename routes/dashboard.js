import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { dashboardData } from '../controllers/dashboardController.js';

const router = express.Router();

router.use(requireAuth)

router.get('/', dashboardData)

export default router;