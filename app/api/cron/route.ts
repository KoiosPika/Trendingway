import { createEarning } from '@/lib/actions/earning.actions';
import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import Insight from '@/lib/database/models/insight.model';

const BATCH_SIZE = 100;

async function createBulkEarnings() {
    try {
        await connectToDatabase();

        const now = new Date();
        const query = { insightPeriod: { $lt: now }, insightful: "Awaiting" };

        let insights;

        do {

            insights = await Insight.find(query).limit(BATCH_SIZE);

            for (const insight of insights) {
                await createEarning(insight._id);
            }

        } while (insights.length > 0);
    } catch (error) {
        console.error('Error checking report dates:', error);
    }
}

export async function GET() {
    await createBulkEarnings();
    return Response.json({ message: 'Bulk earnings created' });
}