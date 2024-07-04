import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';

const getAllExpenses = {
    name: 'retrieve-expenses',
    description: 'Retrieve all expenses for the user',
    async execute(interaction) {
        try {
            // Retrieve user by Discord ID
            const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');
            
            if (!user) {
                return interaction.reply(`User not found. Please register first.`);
            }

            if (user.expenses.length === 0) {
                return interaction.reply('You have no recorded expenses.');
            }

            // Format expenses for display
            const expenseList = user.expenses.map(expense => {
                return `**${expense.category}**: ₹${expense.amount.toFixed(2)} for ${expense.description} on ${expense.date.toDateString()}`;
            }).join('\n');

            // Reply with the list of expenses
            return interaction.reply(`Here are your expenses:\n${expenseList}`);
        } catch (error) {
            console.error(error);
            return interaction.reply('There was an error retrieving your expenses.');
        }
    },
};

export default getAllExpenses;