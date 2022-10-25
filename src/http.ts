/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

import './database';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      console.log(err);
      return response.status(400).json(err.message);
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);
app.use(express.static(path.join(__dirname, '..', 'public')));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

export { httpServer, io };
