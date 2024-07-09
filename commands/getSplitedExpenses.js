import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';

const getSplitedExpenses = {
    name: 'split-expenses',
    description: 'Split the expenses among users in equal amount based on your group id',

    async execute(interaction) {
        try {
            // Retrieve user by Discord ID and populate expenses
            const user = await User.findOne({ discordId: interaction.user.id }).populate('expenses');

            if (!user) {
                return interaction.reply(`User not found. Please register first.`);
            }

            if (user.expenses.length === 0) {
                return interaction.reply('You have no recorded expenses.');
            }

            // Get the group ID of the user
            const groupId = user.groupId;

            // Retrieve all users in the same group and populate their expenses
            const groupUsers = await User.find({ groupId }).populate('expenses');

            if (groupUsers.length === 0) {
                return interaction.reply('No other users found in your group.');
            }

            // Calculate total expenses of all group members
            let totalExpenses = 0;
            for (let i = 0; i < groupUsers.length; i++) {
                const groupUser = groupUsers[i];
                for (let j = 0; j < groupUser.expenses.length; j++) {
                    const expense = groupUser.expenses[j];
                    if (typeof expense.amount === 'number') {
                        totalExpenses += expense.amount;
                    } else {
                        console.error(`Invalid expense amount: ${expense.amount} for user ${groupUser.username}`);
                    }
                }
            }

            // Calculate the amount each user should pay
            const amountPerUser = totalExpenses / groupUsers.length;

            // Split the expenses among users
            const splitExpenses = [];
            for (let i = 0; i < groupUsers.length; i++) {
                const groupUser = groupUsers[i];
                let userTotalExpenses = 0;

                for (let j = 0; j < groupUser.expenses.length; j++) {
                    const expense = groupUser.expenses[j];
                    if (typeof expense.amount === 'number') {
                        userTotalExpenses += expense.amount;
                    } else {
                        console.error(`Invalid expense amount: ${expense.amount} for user ${groupUser.username}`);
                    }
                }

                splitExpenses.push({
                    username: groupUser.username,
                    amount: userTotalExpenses - amountPerUser,
                });
            }

            // Calculate how much each user should give or take
            const toGive = [];
            const toTake = [];
            for (let i = 0; i < splitExpenses.length; i++) {
                const splitExpense = splitExpenses[i];
                if (splitExpense.amount > 0) {
                    toTake.push(splitExpense);
                } else if (splitExpense.amount < 0) {
                    toGive.push(splitExpense);
                }
            }

            // Prepare transactions
            let transactions = [];
            for (let i = 0; i < toGive.length; i++) {
                const giver = toGive[i];
                let amountToDistribute = -giver.amount;
                for (let j = 0; j < toTake.length; j++) {
                    const taker = toTake[j];
                    if (amountToDistribute === 0) break;
                    let amountToReceive = taker.amount;

                    if (amountToDistribute <= amountToReceive) {
                        transactions.push(`${giver.username} should give ₹${amountToDistribute.toFixed(2)} to ${taker.username}`);
                        taker.amount -= amountToDistribute;
                        amountToDistribute = 0;
                    } else {
                        transactions.push(`${giver.username} should give ₹${amountToReceive.toFixed(2)} to ${taker.username}`);
                        amountToDistribute -= amountToReceive;
                        taker.amount = 0;
                    }
                }
            }

            // Display the results
            let response = `Total expenses: ₹${totalExpenses.toFixed(2)}\n`;
            response += `Amount per head: ₹${amountPerUser.toFixed(2)}\n`;
            response += `Amount due after calculation:\n`;
            for (let i = 0; i < splitExpenses.length; i++) {
                const splitExpense = splitExpenses[i];
                response += `${splitExpense.username}: ₹${splitExpense.amount.toFixed(2)}\n`;
            }
            response += `Transactions:\n`;
            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];
                response += `${transaction}\n`;
            }

            return await interaction.reply(response);
        } catch (error) {
            console.error(error);
            return interaction.reply('There was an error retrieving your expenses.');
        }
    }
};

export default getSplitedExpenses;
