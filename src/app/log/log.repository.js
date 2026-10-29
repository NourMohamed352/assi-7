import { db } from "../../common/db/connection.js";

export const createCappedLogs = async () => {
    await db.createCollection('logs', {
        capped: true,
        size: 1048576
    });

    return true;
};

export const insertLog = async (logData) => {
    const result = await db.collection('logs').insertOne(logData);
    return result;
};