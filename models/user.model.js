import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        discordId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        groupId: {
            type: String,
            required: false,
        },
        expenses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Expense",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
