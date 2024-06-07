'use server'

import cron from 'node-cron';
import { connectToDatabase } from '../database';
import Review, { IReview } from '../database/models/review.model';
import { createEarning } from './earning.actions';
import Order from '../database/models/order.model';

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

async function createOrder(){
    try {
        await connectToDatabase();

        await Order.create({
            User: '6657f3a7bda301a4a8e29d00',
            amount: 27000,
            stripeId: 'HelloIamHere'
        })
    } catch (error) {
        console.log(error)
    }
}

cron.schedule('*/5 * * * *', () => {
    createOrder();
});