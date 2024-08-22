import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';

import groupController from './controllers/groupController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/groups', groupController);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});