import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log( 'process.env.MONGO_URI' + process.env.MONGO_URI)
  } catch (error) {
    console.log("Failed connected to Mongodb", error.message);
    process.exit(1);
  }
};

export default connectDB;
