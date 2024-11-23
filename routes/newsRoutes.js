import express from 'express';
import { getHeadlines } from '../controllers/newsController.js';

const router = express.Router();

// Route to get scraped headlines in real-time
router.get('/', getHeadlines);
router.get('/', getHome)

export default router;
