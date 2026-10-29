import {Router} from "express";
export const bookRouter = Router();
import {
    addIndex, aggregate1, aggregate2, aggregate3, aggregate4,
    createBatchBooks,
    createBook,
    createCollection, deleteBooksByYear,
    getBook, getBooksByGenreController,
    getBooksByYear, getExcludeGenres, getSkipLimit, getYearInteger,
    updateBook
} from './book.controller.js';
bookRouter.post('/collection/books', createCollection);
bookRouter.post('/collection/books/index', addIndex);
bookRouter.post('/books', createBook);
bookRouter.post('/books/batch', createBatchBooks);
bookRouter.patch('/books/:title', updateBook);
bookRouter.get('/books/title', getBook);
bookRouter.get('/books/year', getBooksByYear);
bookRouter.get('/books/genre', getBooksByGenreController);
bookRouter.get('/books/skip-limit', getSkipLimit);
bookRouter.get('/books/year-integer', getYearInteger);
bookRouter.get('/books/exclude-genres', getExcludeGenres);
bookRouter.delete('/books/before-year', deleteBooksByYear);
bookRouter.get('/books/aggregate1', aggregate1);
bookRouter.get('/books/aggregate2', aggregate2);
bookRouter.get('/books/aggregate3', aggregate3);
bookRouter.get('/books/aggregate4', aggregate4);



