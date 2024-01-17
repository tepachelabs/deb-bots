import express, {Application} from 'express';
import apiRoutes from './routes/apiRoutes';
import logger from "./logger";
import * as discord from "./bot/discord";
import * as telegram from "./bot/telegram";
import {apiErrorHandler} from "./errors";
import {analytics} from "./analytics";

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

app.use(apiErrorHandler());

Promise.all([
  discord.init(),
  telegram.init()
]).then(_value => logger.info('Bots are initialized'))

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')
  server.close(async () => {
    await analytics.onShutdown()
    logger.info('HTTP server closed')
  })
})
