import express, {Application} from 'express';
import apiRoutes from './routes/apiRoutes';
import {initDiscord} from './bot/discord';
import logger from "./logger";

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

initDiscord()
  .then(_value => logger.info('Discord bot initialized'))
