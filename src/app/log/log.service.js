import {createCappedLogs, insertLog} from './log.repository.js';

export const setupLogsCollection = async () => {
    try {
        await createCappedLogs();
        return { ok: 1 };
    } catch (error) {
        if (error.code === 48) {
            throw new Error('Collection "logs" already exists.');
        }
        throw error;
    }
};

export const addNewLog = async (logData) => {
    const result = await insertLog(logData);
    return result;
};