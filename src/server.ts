import express, {Application} from 'express';
import apiRoutes from './routes/apiRoutes';
import {initDiscord} from './bot/discord';
import logger from "./logger";
import {initTelegramBot} from "./bot/telegram";

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});


Promise.all([
  initDiscord(),
  initTelegramBot()
]).then(_value => logger.info('Bots are initialized'))
