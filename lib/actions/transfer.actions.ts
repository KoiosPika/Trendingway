'use server'

import { connectToDatabase } from "../database";
import Transfer from "../database/models/transfer.model";

export async function getAllTransfers(userId: string) {
    try {
        await connectToDatabase();

        const transfers = await Transfer.find({ User: userId }).sort({ createdAt: -1 }).limit(3)

        return JSON.parse(JSON.stringify(transfers));
    } catch (error) {
        console.log(error);
    }

}

export async function getTransfersData(userId: string, year: number) {
    try {
        await connectToDatabase();

        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const transfers = await Transfer.find({
            User: userId,
            createdAt: { $gte: start, $lt: end }
        }).sort({ createdAt: -1 });

        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
        const groupedTransfers = months.map(month => ({
            month,
            total: 0,
            fee: 0,
            transferCount: 0
        }));

        transfers.forEach(transfer => {
            const monthIndex = new Date(transfer.createdAt).getMonth();
            groupedTransfers[monthIndex].total += transfer.amount;
            groupedTransfers[monthIndex].fee += transfer.fee;
            groupedTransfers[monthIndex].transferCount += 1;
        });

        return JSON.parse(JSON.stringify(groupedTransfers));

    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedTransfers(userId: string, skip: number) {
    try {
        await connectToDatabase();

        const order = await Transfer.find({ User: userId }).sort({ createdAt: -1 }).skip(skip).limit(9)

        return JSON.parse(JSON.stringify(order))

    } catch (error) {
        console.log(error);
    }
}