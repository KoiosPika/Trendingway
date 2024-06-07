import { createEarning } from '@/lib/actions/earning.actions';
import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import Review from '@/lib/database/models/review.model';

const BATCH_SIZE = 100;

async function createBulkEarnings() {
    try {
        await connectToDatabase();

        const now = new Date();
        const query = { insightfulDate: { $lt: now }, insightful: "Awaiting" };

        let reviews;

        do {

            reviews = await Review.find(query).limit(BATCH_SIZE);

            for (const review of reviews) {
                await createEarning(review._id);
            }

        } while (reviews.length > 0);
    } catch (error) {
        console.error('Error checking report dates:', error);
    }
}

async function createOrder() {
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

export async function GET() {
    await createBulkEarnings();
    return Response.json({ message: 'Bulk earnings created' });
}