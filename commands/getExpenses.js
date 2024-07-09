import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';

const getAllExpenses = {
    name: 'retrieve-expenses',
    description: 'Retrieve all expenses for the user',
    async execute(interaction) {
        try {
            await interaction.deferReply();
            
            // Retrieve user by Discord ID
            const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');
            
            if (!user) {
                return interaction.editReply(`User not found. Please register first.`);
            }

            if (user.expenses.length === 0) {
                return interaction.editReply('You have no recorded expenses.');
            }

            // Format expenses for display
            let expenseList = '';
            for (let i = 0; i < user.expenses.length; i++) {
                const expense = user.expenses[i];
                expenseList += `**${expense.category}**: ₹${expense.amount.toFixed(2)} for ${expense.description} on ${expense.date.toDateString()}\n`;
            }

            // Edit the initial reply with the list of expenses
            return interaction.editReply(`Here are your expenses:\n${expenseList}`);
        } catch (error) {
            console.error(error);
            return interaction.editReply('There was an error retrieving your expenses.');
        }
    },
};

export default getAllExpenses;
