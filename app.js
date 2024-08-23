import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';
import groupController from './controllers/groupController.js';
import postController from  './controllers/postController.js';
import imageController from './controllers/imageController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/groups', groupController);
app.use('/api/posts', postController);
app.use('/api/image', imageController);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});