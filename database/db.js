import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' })

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected!")
    }
    catch(error){
        console.log("Database Connection failed:", error.message)
        process.exit(1)
    }
}

export default connectDB