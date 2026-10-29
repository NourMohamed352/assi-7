import { MongoClient } from 'mongodb';
const client = new MongoClient("mongodb://localhost:27017");
export  const db = client.db("blog_app");