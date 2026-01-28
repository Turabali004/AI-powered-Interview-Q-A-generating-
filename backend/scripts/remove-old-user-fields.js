import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

async function runMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");

    const result = await User.updateMany(
      {},
      {
        $unset: {
          lastLogin: "",
          isVerified: "",
        },
      }
    );

    console.log(`Fields removed from ${result.modifiedCount} users`);

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
