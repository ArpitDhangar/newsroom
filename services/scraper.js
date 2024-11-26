import axios from 'axios';
import * as cheerio from 'cheerio';
import Headline from '../models/headlines.js';

// Individual scraper for Times of India
const scrapeTimesOfIndia = async () => {
    try {
        const { data } = await axios.get('https://timesofindia.indiatimes.com/india');
        const $ = cheerio.load(data);

        const headlines = [];

        $('div.WavNE, div.WanNE').each((_, element) => {
            const title = $(element).text().trim();
            if (title) { // Only add non-empty titles
                headlines.push(title);
            }
        });
        return headlines;

    } catch (error) {
        console.error('Error scraping Times of India:', error);
        return [];
    }
};

// Add other scraper functions for NDTV, The Hindu, Indian Express, etc.
const scrapeNDTV = async () => {
    try {
        const { data } = await axios.get('https://www.ndtv.com/india');
        const $ = cheerio.load(data);
        const headlines = [];
        $('h2.newsHdng').each((_, element) => {
            const title = $(element).text().trim();
            if (title) headlines.push(title);
        });
        return headlines;
    } catch (error) {
        console.error('Error scraping NDTV:', error);
        return [];
    }
};

const scrapeTheHindustanTimes = async () => {
    try {
        const { data } = await axios.get('https://www.hindustantimes.com/');
        const $ = cheerio.load(data);
        const headlines = [];
        $('h3.hdg3').each((_, element) => {
            const title = $(element).text().trim();
            if (title) headlines.push(title);
        });
        return headlines;
    } catch (error) {
        console.error('Error scraping NDTV:', error);
        return [];
    }
};

const scrapeJagran = async () => {
    try {
        const { data } = await axios.get('https://english.jagran.com/');
        const $ = cheerio.load(data);
        const headlines = [];
        $('div.h3 h2').each((_, element) => {
            const title = $(element).text().trim();
            if (title) headlines.push(title);
        });
        return headlines;
    } catch (error) {
        console.error('Error scraping NDTV:', error);
        return [];
    }
};

const scrapeBBC = async () => {
    try {
        const { data } = await axios.get('https://www.bbc.com/news');
        const $ = cheerio.load(data);
        const headlines = [];
        $('h2[data-testid="card-headline"]').each((_, element) => {
            const title = $(element).text().trim();
            if (title) headlines.push(title);
        });
        return headlines;
    } catch (error) {
        console.error('Error scraping NDTV:', error);
        return [];
    }
};


// Combined function to scrape all headlines

const scrapeAllHeadlines = async () => {
    const sources = [
        { name: 'Times of India', scraper: scrapeTimesOfIndia },
        { name: 'NDTV', scraper: scrapeNDTV },
        { name: 'The Hindustan Times', scraper: scrapeTheHindustanTimes },
        { name: 'Jagran', scraper: scrapeJagran },
        { name: 'BBC', scraper: scrapeBBC }
    ];

    const results = {};

    for (const { name, scraper } of sources) {
        try {
            const headlines = await scraper(); // Call the individual scraper function
            results[name] = headlines;

            if (headlines.length > 0) {
                // Save to database
                const newHeadlineEntry = new Headline({
                    source: name,
                    headlines: headlines
                });

                await Headline.deleteOne({ source: name });
                console.log("Previous Data successfully...")
                await newHeadlineEntry.save();
                console.log(`Headlines from ${name} saved successfully!`);
            } else {
                console.log(`No headlines found for ${name}.`);
            }
        } catch (error) {
            console.error(`Error scraping and saving headlines from ${name}:`, error);
        }
    }

    return results; // Return scraped headlines
};

export default scrapeAllHeadlines;