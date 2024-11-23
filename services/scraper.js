import axios from 'axios';
import * as cheerio from 'cheerio';

// Individual scraper for Times of India
const scrapeTimesOfIndia = async () => {
    try {
        const { data } = await axios.get('https://timesofindia.indiatimes.com/india');
        const $ = cheerio.load(data);
        const headlines = [];
        $('div.WavNE, div.WanNE').each((_, element) => {
            const title = $(element).text().trim();
            if (title) headlines.push(title);
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
    return {
        'Times of India': await scrapeTimesOfIndia(),
        'NDTV': await scrapeNDTV(),
        'The HindustanTimes': await scrapeTheHindustanTimes(),
        'Jagran' : await scrapeJagran(),
        'BBC' : await scrapeBBC()
        // Add calls to other scrapers here
    };
};

export default scrapeAllHeadlines;
