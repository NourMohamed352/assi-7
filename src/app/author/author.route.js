import {Router} from "express";
import {addAuthor} from "./author.controller.js";

export const authorRouter = Router();

authorRouter.post('/collection/authors', addAuthor);