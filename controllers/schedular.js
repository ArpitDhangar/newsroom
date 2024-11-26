import cron from 'node-cron'
import scrapeAllHeadlines from '../services/scraper.js'

// Schedule the task to run daily at specific time
const scheduleDailyScrape = () => {
    cron.schedule('0 6 * * *', async () => {
        console.log('Starting daily scraping task...')
        try{
            const results = await scrapeAllHeadlines();
            console.log('Scraping completed and saved:', results)
        }catch(error){
            console.error('Error during daily scraping:', error)
        }
    })
    console.log('Cron job scheduled. Scraper will run daily at 6 AM.')
}

export default scheduleDailyScrape