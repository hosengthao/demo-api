import express from 'express';
import memoRouter from './resources/memo/memo.router.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan)

app.use('/api/memo', memoRouter);

app.listen(3000, () => {
    console.log('server running on port 3000');
});