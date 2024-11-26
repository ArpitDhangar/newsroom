import Headline from '../models/headlines.js';
import scrapeAllHeadlines from '../services/scraper.js';

export const scrapeHeadlines = async (req, res) => {
    try {
        console.log("Starting scraping...");
        const headlines = await scrapeAllHeadlines();
        
        // Sending success message after scraping
        res.status(200).json({
            message: 'Scraping completed successfully',
            data: headlines
        });
    } catch (error) {
        console.error('Error in newsController:', error);
        res.status(500).json({
            message: 'Failed to fetch headlines',
            error: error.message
        });
    }
};

export const getHeadlines = async (req, res) => {
    try {
        const headlines = await Headline.find();
        res.json(headlines);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching headlines',
            error: error.message
        });
    }
};
