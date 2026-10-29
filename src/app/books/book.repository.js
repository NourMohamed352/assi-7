import { db } from "../../common/db/connection.js";

export const createBooksCollection = async () => {
    await db.createCollection('books', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title'],
                properties: {
                    title: {
                        bsonType: 'string',
                        minLength: 1,
                        description: 'Title must be a non-empty string'
                    }
                }
            }
        },
        validationAction: 'error'
    });

    return true;
};

export const insertBook = async (bookData) => {
    const result = await db.collection('books').insertOne(bookData);
    return result;
};

export const createTitleIndex = async () => {
    const result = await db.collection('books').createIndex({ title: 1 });
    return result;
};

export const insertManyBooks = async (booksArray) => {
    const result = await db.collection('books').insertMany(booksArray);
    return result;
};

export const updateBookByTitle = async (title, updatedData) => {
    const result = await db.collection('books').updateOne(
        { title: title }, // الشرط: الـ title
        { $set: updatedData } // البيانات الجديدة
    );

    return result;
};

export const findBookByTitle = async (title) => {
    const result = await db.collection('books').findOne({ title: title });
    return result;
};

export const findBooksByYearRange = async (from, to) => {
    const result = await db.collection('books').find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray();

    return result;
};

export const findBooksByGenre = async (genre) => {
    const result = await db.collection('books').find({
        genres: genre
    }).toArray();

    return result;
};

export const getBooksSkipLimit = async () => {
    const result = await db.collection('books')
        .find({})
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray();

    return result;
};

export const findBooksWithIntegerYear = async () => {
    const result = await db.collection('books').find({
        year: { $type: 'int' }
    }).toArray();

    return result;
};

export const findBooksExcludingGenres = async () => {
    const result = await db.collection('books').find({
        genres: { $nin: ['Horror', 'Science Fiction'] }
    }).toArray();

    return result;
};

export const deleteBooksBeforeYear = async (year) => {
    const result = await db.collection('books').deleteMany({
        year: { $lt: Number(year) }
    });

    return result;
};

export const aggregateBooksAfter2000 = async () => {
    const result = await db.collection('books').aggregate([
        {
            $match: { year: { $gt: 2000 } }
        },
        {
            $sort: { year: -1 }
        }
    ]).toArray();

    return result;
};

export const aggregateBooksProject = async () => {
    const result = await db.collection('books').aggregate([
        {
            $match: { year: { $gt: 2000 } }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();

    return result;
};

export const aggregateBooksUnwind = async () => {
    const result = await db.collection('books').aggregate([
        {
            $unwind: "$genres"
        },
        {
            $project: {
                _id: 0,
                title: 1,
                genres: 1
            }
        }
    ]).toArray();

    return result;
};

export const aggregateBooksLogs = async () => {
    const result = await db.collection('logs').aggregate([
        {
            $lookup: {
                from: 'books',
                let: { bId: "$book_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    "$_id",
                                    {
                                        $convert: {
                                            input: "$$bId",
                                            to: "objectId",
                                            onError: null
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    { $project: { _id: 0, title: 1, author: 1, year: 1 } }
                ],
                as: 'book_details'
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,
                book_details: 1
            }
        }
    ]).toArray();

    return result;
};