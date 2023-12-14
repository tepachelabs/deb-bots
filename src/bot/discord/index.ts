import {Client, Events, GatewayIntentBits, REST, Routes, Snowflake} from 'discord.js';
import logger from '../../logger';
import {command} from './commands/dollar';
import {DiscordCommand} from "./commands/types";

// Commands in case we want to add more in the future.
const commands : Map<string, DiscordCommand> = new Map()
commands.set(command.data.name, command);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

client.once(Events.ClientReady, readyClient => {
  logger.info(`* Discord bot [READY]! [ONLINE] as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
    } else {
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }
});


const DISCORD_BOT_TOKEN = process.env['DISCORD_BOT_TOKEN'];
const DISCORD_APP_ID = process.env['DISCORD_APP_ID'] as Snowflake;

export const initDiscord = async () => {
  if (DISCORD_BOT_TOKEN) {
    await client.login(DISCORD_BOT_TOKEN);
    const rest = new REST().setToken(DISCORD_BOT_TOKEN);

    if (DISCORD_APP_ID) {
      await (async () => {
        try {
          logger.info(`Started refreshing application (/) commands.`);

          const data = await rest.put(
            Routes.applicationCommands(DISCORD_APP_ID),
            {body: [command.data.toJSON()]},
          ) as Array<unknown>; // Don't really care about the type here, we know it's an array.

          logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
          // And of course, make sure you catch and log any errors!
          logger.error(error);
        }
      })();
    }
  } else {
    logger.error('DISCORD_BOT_TOKEN not available');
  }
}

