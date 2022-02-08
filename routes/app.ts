import express from 'express';
import {apiRouter} from './api_router';

// INIT
const app:express.Application = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/api', apiRouter);

export {
    app,
}