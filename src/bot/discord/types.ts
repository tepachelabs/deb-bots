import {CommandInteraction} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

export type ExecuteCommandFunction = (interaction: CommandInteraction) => Promise<void>

export interface DiscordCommand {
  data: SlashCommandBuilder,
  execute: ExecuteCommandFunction
}
