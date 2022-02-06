import express from 'express';
import {createConnection} from 'typeorm';
import {User} from './entities/User';
import {apiRouter} from './routes/api_router';

// INIT
const app = express();

// MAIN
const main = async() => {

    // DATABASE SETTINGS
    createConnection({
        type: 'sqlite',
        database: 'db.sqlite3',
        entities: [User],
        synchronize: true,
    })
    
    // SERVER SETTINGS
    .then(() => {
        console.log('Connected to database');

        // MIDDLEWARE
        app.use(express.json());

        // ROUTES
        app.use('/api', apiRouter);

        app.listen(5000,()=>{
            console.log(`Server listening at http://localhost:5000`);
        });

    })
    
    // ERROR CATCHING
    .catch((error) => {
        console.log(error);
    });
    
}
main();