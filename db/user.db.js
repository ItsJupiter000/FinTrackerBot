import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/DissBot`);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("MongoDB Connection Failed!", error);
        process.exit(1);
    }
};

export default connectDB;
