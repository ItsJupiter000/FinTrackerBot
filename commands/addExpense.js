import { Options } from "discord.js";
import Expense from "../models/expense.model.js";
import mongoose from 'mongoose';
import User from "../models/user.model.js";

const addExpenseCommand = {
    name: "add-expense",
    description: "Adds an expense to the database",
    options: [
        {
            name: "category",
            description: "The category of the expense",
            type: 3,
            required: true,
            choices: [
                { name: "Food", value: "food" },
                { name: "Transportation", value: "transportation" },
                { name: "Entertainment", value: "entertainment" },
                { name: "Utilities", value: "utilities" },
                { name: "Other", value: "other" },
            ],
        },
        {
            name: "amount",
            description: "The amount of the expense",
            type: 4,
            required: true,
        },
        {
            name: "description",
            description: "The description of the expense",
            type: 3,
            required: true,
        },
        {
            name: "type",
            description: "The type of the expense",
            type: 3,
            required: true,
            choices: [
                { name: "Credit", value: "credit" },
                { name: "Debit", value: "debit" },
            ],
        },
    ],
    async execute(interaction) {
        const category = interaction.options.getString("category");
        const amount = interaction.options.getInteger("amount");
        const description = interaction.options.getString("description");
        const type = interaction.options.getString("type");

        // Retrieve user by Discord ID
        const user = await User.findOne({ discordId: interaction.user.id });
        if (!user) {
            return interaction.reply(`User not found. Please register first.`);
        }

        const expense = new Expense({
            // user: interaction.user.id,
            user: user._id,
            category,
            amount,
            description,
            type,
        });

        await expense.save();

        // Add expense to user's expenses array
        user.expenses.push(expense._id);
        await user.save();


        return interaction.reply(`Expense added successfully.`);
    }
};

export default addExpenseCommand;

