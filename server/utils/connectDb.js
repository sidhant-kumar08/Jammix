import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
       console.log('mongodb conected')
    } catch (error) {
        console.log('mongodb connection failed', error);
    }
}

