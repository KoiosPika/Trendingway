'use server'

import cron from 'node-cron';
import { connectToDatabase } from '../database';
import Review, { IReview } from '../database/models/review.model';
import { createEarning } from './earning.actions';

const BATCH_SIZE = 100;

async function createBulkEarnings() {
    try {
        await connectToDatabase()

        const now = new Date();

        const query = { insightPeriod: { $lt: now } };

        let reviews;

        do {
            
            reviews = await Review.find(query).limit(BATCH_SIZE);

            for (const review of reviews) {
                await createEarning(review._id);
            }

        } while (reviews.length > 0);
    } catch (error) {
        console.log(error)
    }
}

cron.schedule('0 * * * *', () => {
    
    createBulkEarnings();
});