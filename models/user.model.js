import mongoose, { Schema } from "mongoose";

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
