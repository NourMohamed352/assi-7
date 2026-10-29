import {
    aggregateBooksAfter2000, aggregateBooksLogs, aggregateBooksProject, aggregateBooksUnwind,
    createBooksCollection,
    createTitleIndex,
    deleteBooksBeforeYear, findBookByTitle, findBooksByGenre, findBooksByYearRange, findBooksExcludingGenres,
    findBooksWithIntegerYear, getBooksSkipLimit,
    insertBook,
    insertManyBooks,
    updateBookByTitle
} from './book.repository.js';

export const setupBooksCollection = async () => {
    try {
        await createBooksCollection();
        return { success: true, message: 'Collection "books" created with validation.' };
    } catch (error) {
        if (error.code === 48) {
            throw new Error('Collection "books" already exists.');
        }
        throw error;
    }
};

export const addNewBook = async (bookData) => {
    const result = await insertBook(bookData);
    return result;
};

export const setupTitleIndex = async () => {
    try {
        const indexName = await createTitleIndex();
        return { success: true, indexName: indexName };
    } catch (error) {
        throw error;
    }
};

export const addMultipleBooks = async (booksArray) => {
    if (!Array.isArray(booksArray) || booksArray.length === 0) {
        throw new Error('Please provide an array of books');
    }
    const result = await insertManyBooks(booksArray);
    return result;
};

export const modifyBookYear = async (title, newYear) => {
    const result = await updateBookByTitle(title, { year: newYear });
    return result;
};

export const getBookByTitle = async (title) => {
    const book = await findBookByTitle(title);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
};

export const getBooksByYearRange = async (from, to) => {
    if (!from || !to) {
        throw new Error('Both from and to query parameters are required');
    }
    const books = await findBooksByYearRange(from, to);
    return books;
};

export const getBooksByGenre = async (genre) => {
    if (!genre) {
        throw new Error('Genre query parameter is required');
    }
    const books = await findBooksByGenre(genre);
    return books;
};

export const getSkippedLimitedBooks = async () => {
    const books = await getBooksSkipLimit();
    return books;
}

export const getBooksByIntegerYear = async () => {
    const books = await findBooksWithIntegerYear();
    return books;
};

export const getBooksExcludingGenres = async () => {
    const books = await findBooksExcludingGenres();
    return books;
};

export const removeBooksBeforeYear = async (year) => {
    if (!year) {
        throw new Error('Year query parameter is required');
    }
    const result = await deleteBooksBeforeYear(year);
    return result;
};

export const getAggregatedBooks = async () => {
    const books = await aggregateBooksAfter2000();
    return books;
};

export const getProjectedBooks = async () => {
    const books = await aggregateBooksProject();
    return books;
};

export const getUnwoundBooks = async () => {
    const books = await aggregateBooksUnwind();
    return books;
};

export const getJoinedBooksLogs = async () => {
    const logs = await aggregateBooksLogs();
    return logs;
};