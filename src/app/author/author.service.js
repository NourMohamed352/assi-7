import { insertAuthor } from './author.repository.js';

export const createNewAuthor = async (data) => {
    const result = await insertAuthor(data);
    return result;
};