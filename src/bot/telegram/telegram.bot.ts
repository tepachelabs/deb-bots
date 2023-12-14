import {Telegraf} from "telegraf";
import logger from "../../logger";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export const init = () => {
  if (!TELEGRAM_BOT_TOKEN) {
    logger.error('TELEGRAM_BOT_TOKEN not available');
    return;
  }

  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
  bot.catch((err) => {
    logger.error(err);
  });

  return bot
}

export const start = (bot: Telegraf) => {
  bot.start((ctx) => ctx.reply('STARTED'));
  bot.launch()
    .then(() => {
      logger.info('* Telegram bot [ONLINE]');
      return
    })
    .catch((err) => {
      logger.info('* Telegram bot couldn\'t run');
      logger.error(err);
    });
}
