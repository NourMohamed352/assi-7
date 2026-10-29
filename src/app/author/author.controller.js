import { createNewAuthor } from './author.service.js';

export const addAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const result = await createNewAuthor(authorData);
        res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};