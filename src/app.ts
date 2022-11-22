import express from 'express';
import router from './routers/movie-router';
import rout from './routers/student-router';
import {z} from 'zod';
import routerbank from './routers/bank-router';

const app = express();
app.use(express.json());
app.use('/api/v1/movies', router);
app.use('/api/v1/studens', rout);
app.use('/api/v1/studens', routerbank);






app.listen(5001, () => {
    console.log('Server is running in port 5001')});