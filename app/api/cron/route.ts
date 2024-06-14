import { cancelOrder } from '@/lib/actions/request.actions';
import { connectToDatabase } from '@/lib/database';
import Request from '@/lib/database/models/request.model';

const BATCH_SIZE = 100;

async function createBulkRefunds() {

    let hasMore = true;

    try {
        const now = new Date();
        await connectToDatabase();

        do {
            const requests = await Request.find({ endDate: { '$lt': now } })
                .sort({ createdAt: 1 })
                .limit(BATCH_SIZE);

            if (requests.length === 0) {
                hasMore = false;
            } else {
                requests.forEach(request => {
                    cancelOrder(request._id, 'Canceled').catch(error => {
                        console.error(`Failed to cancel order ${request._id}:`, error);
                    });
                });
            }
        } while (hasMore);
    }
    catch (error) {
        console.log(error)
    }
}

export async function GET() {
    await createBulkRefunds()
    return Response.json({ message: 'Bulk earnings created' });
}