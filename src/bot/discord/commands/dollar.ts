import {CommandInteraction, SlashCommandBuilder} from 'discord.js';
import {getBotMessage} from '../../../data/network';
import {DiscordCommand} from "./types";

export const data = new SlashCommandBuilder()
  .setName('dolar')
  .setDescription('Verificar precio del dolar en diferentes bancos')

export const execute = async (interaction: CommandInteraction) => {
  const message = await getBotMessage()
  await interaction.reply(message)
}

export const command: DiscordCommand = {
  data,
  execute
}
