import express from 'express';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';
import groupController from './controllers/groupController.js';
import postController from  './controllers/postController.js';

const app = express();

app.use(express.json());

app.use('/api/groups', groupController);
app.use('/api/posts', postController);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});