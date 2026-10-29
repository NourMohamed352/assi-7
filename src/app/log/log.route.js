import { Router } from "express";
import {createLog, createLogsCollection} from './log.controller.js';

export const logRouter = Router();

logRouter.post('/collection/logs/capped', createLogsCollection);

logRouter.post('/logs', createLog);