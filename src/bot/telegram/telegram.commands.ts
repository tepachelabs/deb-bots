import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { getBotMessage } from "../../data/network";
import {analytics} from "../../analytics";
import logger from "../../logger";

const config = {
  commands: [
    "dolar",
    "dollar",
  ],
  specialCharCommands: [
    'dólar'
  ]
}

const responses = {
  dollar: async (ctx: Context<Update>) => {
    if (ctx.message && 'text' in ctx.message) {

      const chatType= 'chat' in ctx.message ? ctx.message.chat.type : 'unknown';
      const fullCommand = ctx.message.text;
      const commandUsedByUser = fullCommand.split(' ')[0];
      analytics.capture(ctx.from?.username, 'used dollar command', {
        platform: 'telegram',
        command: commandUsedByUser,
        chatType,
      })
      // Get multiplier from message
      const multiplierFromTextMessage = retrieveMultiplierFromTextMessage(ctx.message.text);
      // Ensure multiplier is a positive number
      const multiplier = multiplierFromTextMessage > 0 ? multiplierFromTextMessage : 1;
      // Get message from data source, including multiplier
      const message = await getBotMessage(multiplier);
      // Reply to user
      await ctx.reply(message);
    } else {
      logger.error("Message is not text")
    }
  },
  about: (ctx: Context<Update>) => ctx.reply('Dolarenbancos bot. More info at https://dolarenbancos.com.')
}

export const registerBot = async (bot: Telegraf) => {
  const registerCommands = config.commands.map(word => {
    return {
      'command': word,
      'description': "Verificar precio del dolar en diferentes bancos"
    }
  })

  await bot.telegram.setMyCommands([...registerCommands,
    {
      'command': "about",
      'description': "Información sobre el bot"
    }
  ]);

  const allCommands = [
    ...config.commands,
    ...config.specialCharCommands
  ]

  // Register dollar commands
  allCommands.forEach(word => bot.command(word, responses.dollar))

  // All other commands in here
  bot.command('about', responses.about);
}

function retrieveMultiplierFromTextMessage(message: string): number {
  const parts = message.split(' ');
  return parts.length === 2 ? parseInt(parts[1], 10) : 1
}
