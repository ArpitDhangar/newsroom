import scrapeAllHeadlines from '../services/scraper.js';

export const getHeadlines = async (req, res) => {
    try {
        const headlines = await scrapeAllHeadlines();
        res.status(200).json(headlines);
    } catch (error) {
        console.error('Error in newsController:', error);
        res.status(500).json({ message: 'Failed to fetch headlines', error: error.message });
    }
};
