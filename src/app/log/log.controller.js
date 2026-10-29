import {addNewLog, setupLogsCollection} from './log.service.js';

export const createLogsCollection = async (req, res) => {
    try {
        const result = await setupLogsCollection();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createLog = async (req, res) => {
    try {
        const logData = req.body;
        const result = await addNewLog(logData);
        res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

