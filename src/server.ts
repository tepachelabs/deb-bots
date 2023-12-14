import express, {Application} from 'express';
import apiRoutes from './routes/apiRoutes';
import logger from "./logger";
import * as discord from "./bot/discord";
import * as telegram from "./bot/telegram";

const app: Application = express();
const port = 3000;

app.use('/api', apiRoutes);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});


Promise.all([
  discord.init(),
  telegram.init()
]).then(_value => logger.info('Bots are initialized'))
