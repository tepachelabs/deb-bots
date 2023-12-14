import logger from "../../logger";
import * as telegramCommands from "./telegram.commands";
import * as telegramBot from "./telegram.bot";


export const init = async () => {
  const bot = telegramBot.init()
  if (!bot) {
    logger.error('Telegram bot couldn\'t run');
    return
  }

  await telegramCommands.registerBot(bot)

  telegramBot.start(bot)
}
