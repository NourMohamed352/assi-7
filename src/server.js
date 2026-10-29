import express from 'express';
import {bookRouter} from "./app/books/book.route.js";
import {authorRouter} from "./app/author/author.route.js";
import {logRouter} from "./app/log/log.route.js";

const app = express();
app.use(express.json());

app.use('/',logRouter);
app.use('/', bookRouter);
app.use('/',authorRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
