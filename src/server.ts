import express, {Application} from 'express';
import apiRoutes from './routes/apiRoutes';
import {initDiscord} from './bot/discord';
import logger from "./logger";
import * as telegram from "./bot/telegram";

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});


Promise.all([
  initDiscord(),
  telegram.init()
]).then(_value => logger.info('Bots are initialized'))
