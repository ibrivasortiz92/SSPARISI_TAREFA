import express from 'express';
import {apiRouter} from './routes/api_router';
import cors from 'cors';
import path from 'path';

// INIT
const app: express.Application = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/users', apiRouter);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'client', 'dist')));

export {app};
