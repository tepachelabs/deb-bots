import {Context, Telegraf} from "telegraf";
import {getBotMessage} from "../../data/network";
import logger from "../../logger";
import {Update} from "telegraf/typings/core/types/typegram";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export const initTelegramBot = async () => {
  if (TELEGRAM_BOT_TOKEN) {
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    const response = async (ctx: Context<Update>) => {
      if (ctx.message && 'text' in ctx.message && ctx.reply) {
        const message = await getBotMessage()
        await ctx.reply(message);
      }
    };

    bot.command('dolar', response);
    bot.command('dólar', response);
    bot.command('dollar', response);
    bot.command('about', (ctx) => ctx.reply('Dolarenbancos bot. More info at https://dolarenbancos.com.'));

    bot.catch((err) => {
      logger.error(err);
    });

    bot.start((ctx) => ctx.reply('STARTED'));

    bot.launch()
      .then(() => {
        logger.info('* Telegram bot [ONLINE]');
      })
      .catch((err) => {
        logger.info('* Telegram bot couldn\'t run');
        logger.error(err);
      });
  } else {
    logger.error('TELEGRAM_TOKEN not available');
  }
}
