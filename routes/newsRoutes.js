import express from 'express';
import { scrapeHeadlines, getHeadlines } from '../controllers/newsController.js';

const router = express.Router();

// Route to get scraped headlines in real-time
router.get('/scrape', scrapeHeadlines);

// Route to get headlines from the database
router.get('/', getHeadlines)

export default router;