import express, { Application } from 'express';
import apiRoutes from './routes/apiRoutes';

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});