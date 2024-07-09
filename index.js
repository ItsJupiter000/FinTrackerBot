import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import connectDB from './db/user.db.js';
import registerCommand from './commands/register.js';
import getAllExpenses from './commands/addExpense.js';
import addExpenseCommand from './commands/getExpenses.js';
import getSummary from './commands/getSummary.js';
import getSplitedExpenses from './commands/getSplitedExpenses.js';

dotenv.config({
    path: './.env'
});


const startBot = async () => {
    await connectDB();

    const client = new Client({ 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent
        ],
        requestTimeout: 60000
    });

    client.commands = new Map();
    client.commands.set(registerCommand.name, registerCommand);
    client.commands.set(addExpenseCommand.name, addExpenseCommand);
    client.commands.set(getAllExpenses.name, getAllExpenses);
    client.commands.set(getSummary.name, getSummary);
    client.commands.set(getSplitedExpenses.name, getSplitedExpenses);

    client.on("interactionCreate", async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
        }
    });

    // client.on("interactionCreate", interaction => {
    //     console.log(interaction);
    //     interaction.reply('Pong !');
    // });

    client.login(process.env.DISCORD_TOKEN);
};

startBot();