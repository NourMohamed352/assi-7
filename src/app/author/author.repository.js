import { db } from "../../common/db/connection.js";

export const insertAuthor = async (authorData) => {
    const result = await db.collection('authors').insertOne(authorData);
    return result;
};