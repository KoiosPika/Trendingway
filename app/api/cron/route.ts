import { createEarning } from '@/lib/actions/earning.actions';
import { connectToDatabase } from '@/lib/database';
import Order from '@/lib/database/models/order.model';
import Insight from '@/lib/database/models/insight.model';

const BATCH_SIZE = 100;



export async function GET() {
    
    return Response.json({ message: 'Bulk earnings created' });
}