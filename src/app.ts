import express from 'express';
import router from './routers/router';
import {z} from 'zod';

const app = express();
app.use(express.json());
app.use('/api/v1/movies', router)





app.listen(5001);