import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the DB : ", connectionInstance.connection.host);
    } catch (error) {
        console.log("Mongoose Error : ", error);
        process.exit(1);
    }
}

export default connectDB;