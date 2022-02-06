import express from 'express';
import {
    getUsers, 
    createUser,
} from '../controllers/api_controllers';

// INIT
const router =  express.Router();

// ROUTES
router.get('/users', getUsers);
router.post('/create', createUser);

// EXPORT
export {
    router as apiRouter,
}

