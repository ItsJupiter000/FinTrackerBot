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
                // Update all months to use numeric values (0-11)
            ]
        },
    ],
    async execute(interaction) {
        try {
            const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');
            if (!user) {
                return interaction.reply(`User not found. Please register first.`);
            }
            // console.log(user);


            if (user.expenses.length === 0) {
                return interaction.reply('You have no recorded expenses.');
            }

            const month = parseInt(interaction.options.getString('month'), 10);
            const currentYear = new Date().getFullYear();
            const monthExpenses = user.expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === month && expenseDate.getFullYear() === currentYear;
            });
            // console.log(monthExpenses);

            if (monthExpenses.length === 0) {
                return interaction.reply(`You have no recorded expenses for the selected month.`);
            }

            const categoryTotals = await Expense.aggregate([
                { $match: { user: user._id, date: { $gte: new Date(currentYear, month, 1), $lte: new Date(currentYear, month + 1, 0) } } },
                { $group: { _id: '$category', total: { $sum: '$amount' } } }
            ]);

            //also return total expenses for the month using mongoDb aggregation pipeline
            const totalExpenses = await Expense.aggregate([
                { $match: { user: user._id, date: { $gte: new Date(currentYear, month, 1), $lte: new Date(currentYear, month + 1, 0) } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);

            return interaction.reply(`Summary for ${new Date(currentYear, month).toLocaleString('default', { month: 'long' })}:\n${categoryTotals.map(category => `${category._id}: ₹${category.total.toFixed(2)}`).join('\n')}\nTotal expenses: ₹${totalExpenses[0].total.toFixed(2)}`);
            // return interaction.reply(`Summary for the selected month:\n${categoryTotals.map(category => `${category._id}: ₹${category.total.toFixed(2)}`).join('\n')}`);
        } catch (error) {
            console.error(error);
            return interaction.reply('There was an error retrieving the summary.');
        }
    },
};

export default getSummary;


// import User from '../models/user.model.js';
// import Expense from '../models/expense.model.js';
// import { Options } from 'discord.js';

// const getSummary = {
//     name: 'summary',
//     description: 'Retrieve summary of expenses, credits, and debits',
//     options: [
//         {
//             name: 'month',
//             description: 'The month to retrieve the summary for',
//             type: 3,
//             required: true,
//             choices: [
//                 { name: 'January', value: '0' },
//                 { name: 'February', value: '1' },
//                 { name: 'March', value: '2' },
//                 { name: 'April', value: '3' },
//                 { name: 'May', value: '4' },
//                 { name: 'June', value: '5' },
//                 { name: 'July', value: '6' },
//                 { name: 'August', value: '7' },
//                 { name: 'September', value: '8' },
//                 { name: 'October', value: '9' },
//                 { name: 'November', value: '10' },
//                 { name: 'December', value: '11' },
//             ]
//         },
//     ],
//     async execute(interaction) {
//         try {
//             // Retrieve user by Discord ID
//             const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');

//             if (!user) {
//                 return interaction.reply(`User not found. Please register first.`);
//             }

//             if (user.expenses.length === 0) {
//                 return interaction.reply('You have no recorded expenses.');
//             }

//             // Calculate total expenses for each month
//             const month = interaction.options.getString('month');
//             // console.log(month);

//             const monthExpenses = user.expenses.filter(expense => expense.date.getMonth() === parseInt(month));
//             console.log(monthExpenses);

//             if (monthExpenses.length === 0) {
//                 return interaction.reply(`You have no recorded expenses for ${month}.`);
//             }

//             // Calculate total expenses for each category
//             // Used mongoDb aggregation pipeline to group expenses by category and calculate total amount
//             const categoryTotals = await Expense.aggregate([
//                 { $match: { user: user._id, date: { $gte: new Date(2021, 0, 1), $lte: new Date(2021, 11, 31) } } },
//                 { $group: { _id: '$category', total: { $sum: '$amount' } } }
//             ]);

//             // reply with the summary
//             return interaction.reply(`Summary for ${month}:\n${categoryTotals.map(category => `${category._id}: ₹${category.total.toFixed(2)}`).join('\n')}`);

//         } catch (error) {
//             console.error(error);
//             return interaction.reply('There was an error retrieving the summary.');
//         }
//     },
// };

// export default getSummary;