import {
    addMultipleBooks,
    addNewBook, getAggregatedBooks,
    getBookByTitle, getBooksByGenre, getBooksByIntegerYear, getBooksByYearRange,
    getBooksExcludingGenres, getJoinedBooksLogs, getProjectedBooks, getSkippedLimitedBooks, getUnwoundBooks,
    modifyBookYear, removeBooksBeforeYear,
    setupBooksCollection,
    setupTitleIndex
} from './book.service.js';

export const createCollection = async (req, res) => {
    try {
        const result = await setupBooksCollection();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addIndex = async (req, res) => {
    try {
        const result = await setupTitleIndex();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBook = async (req, res) => {
    try {
        const result = await addNewBook(req.body);
        res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBatchBooks = async (req, res) => {
    try {
        const result = await addMultipleBooks(req.body);
        res.status(201).json({
            acknowledged: result.acknowledged,
            insertedIds: result.insertedIds
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const title = req.params.title;
        const updatedData = req.body;
        const newYear = updatedData.year;
        const result = await modifyBookYear(title, newYear);
        res.status(200).json({
            acknowledged: result.acknowledged,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBook = async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({ error: 'Title query parameter is required' });
        }
        const book = await getBookByTitle(title);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getBooksByYear = async (req, res) => {
    try {
        const { from, to } = req.query;
        const books = await getBooksByYearRange(from, to);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksByGenreController = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await getBooksByGenre(genre);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getSkipLimit = async (req, res) => {
    try {
        const books = await getSkippedLimitedBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getYearInteger = async (req, res) => {
    try {
        const books = await getBooksByIntegerYear();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getExcludeGenres = async (req, res) => {
    try {
        const books = await getBooksExcludingGenres();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBooksByYear = async (req, res) => {
    try {
        const { year } = req.query;
        const result = await removeBooksBeforeYear(year);
        res.status(200).json({
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate1 = async (req, res) => {
    try {
        const books = await getAggregatedBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate2 = async (req, res) => {
    try {
        const books = await getProjectedBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate3 = async (req, res) => {
    try {
        const books = await getUnwoundBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate4 = async (req, res) => {
    try {
        const logs = await getJoinedBooksLogs();
        res.status(200).json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




