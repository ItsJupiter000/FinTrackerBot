import { REST, Routes } from "discord.js";
import registerCommand from "./commands/register.js";
import addExpenseCommand from "./commands/addExpense.js";
import getAllExpenses from "./commands/getExpenses.js";
import getSummary from "./commands/getSummary.js";
import getSplitedExpenses from "./commands/getSplitedExpenses.js";

import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// This file is used to register commands to our bot.
// We will use the REST API to register the commands.
const commands = [
  registerCommand,
  addExpenseCommand,
  getAllExpenses,
  getSummary,
  getSplitedExpenses,
];

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    // Debugging: Log command names and check their validity
    commands.forEach((command, index) => {
      console.log(`Command ${index}: ${command.name}`);
      if (!/^[a-z0-9-]{1,32}$/.test(command.name)) {
        console.error(
          `Invalid command name at index ${index}: ${command.name}`
        );
      }

      // Check options if they exist
      if (command.options) {
        command.options.forEach((option, optIndex) => {
          console.log(`Command ${index} Option ${optIndex}: ${option.name}`);
          if (!/^[a-z0-9-]{1,32}$/.test(option.name)) {
            console.error(
              `Invalid option name at command index ${index}, option index ${optIndex}: ${option.name}`
            );
          }
        });
      }
    });

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})(); //IIFE
