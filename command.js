import { REST, Routes } from "discord.js";
import registerCommand from "./commands/register.js";
import addExpenseCommand from "./commands/addExpense.js";
import getAllExpenses from "./commands/getExpenses.js";

import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});


// This file is used to register commands to our bot.

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  registerCommand,
  addExpenseCommand,
  getAllExpenses
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
      
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
      
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
