import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';

const getSummary = {
    name: 'summary',
    description: 'Retrieve summary of expenses, credits, and debits',
    options: [
        {
            name: 'month',
            description: 'The month to retrieve the summary for',
            type: 3,
            required: true,
            choices: [
                { name: 'January', value: '0' },
                { name: 'February', value: '1' },
                { name: 'March', value: '2' },
                { name: 'April', value: '3' },
                { name: 'May', value: '4' },
                { name: 'June', value: '5' },
                { name: 'July', value: '6' },
                { name: 'August', value: '7' },
                { name: 'September', value: '8' },
                { name: 'October', value: '9' },
                { name: 'November', value: '10' },
                { name: 'December', value: '11' },
            ],
        },
    ],
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');
            if (!user) {
                return interaction.editReply(`User not found. Please register first.`);
            }

            if (user.expenses.length === 0) {
                return interaction.editReply('You have no recorded expenses.');
            }

            const month = parseInt(interaction.options.getString('month'), 10);
            const currentYear = new Date().getFullYear();

            const monthExpenses = user.expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === month && expenseDate.getFullYear() === currentYear;
            });

            if (monthExpenses.length === 0) {
                return interaction.editReply(`You have no recorded expenses for the selected month.`);
            }

            // Calculate category totals
            const categoryTotals = {};
            let totalExpenses = 0;

            for (let i = 0; i < monthExpenses.length; i++) {
                const expense = monthExpenses[i];
                const category = expense.category;

                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                }

                categoryTotals[category] += expense.amount;
                totalExpenses += expense.amount;
            }

            // Prepare summary message
            const summaryMessage = `Summary for ${new Date(currentYear, month).toLocaleString('default', { month: 'long' })}:\n${Object.keys(categoryTotals).map(category => `${category}: ₹${categoryTotals[category].toFixed(2)}`).join('\n')}\n**Total expenses: ₹${totalExpenses.toFixed(2)}**`;

            await interaction.editReply(summaryMessage);
        } catch (error) {
            console.error(error);
            return await interaction.editReply('There was an error retrieving the summary.');
        }
    },
};

export default getSummary;
