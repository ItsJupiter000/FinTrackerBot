import User from "../models/user.model.js";

const registerCommand = {
    name: "register",
    description: "Registers a user to the database",
    options: [
        {
            name: "username",
            description: "The username of the user",
            type: 3, //type 3 measns string
            required: true,
        },
        {
            name: "password",
            description: "The password of the user",
            type: 3,
            required: true,
        },
    ],
    async execute(interaction) {
        const username = interaction.options.getString("username");
        const password = interaction.options.getString("password");

        const discordId = interaction.user.id; // Get the Discord user ID

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ discordId });
        if (existingUser) {
            // return interaction.reply(`${username} is already registered.`);
            return interaction.reply("You can only register once.");
        }

        const user = new User({
            username,
            password,
            discordId,
        });

        await user.save();

        return interaction.reply(`${username} has been registered.`);
    },
};

export default registerCommand;
