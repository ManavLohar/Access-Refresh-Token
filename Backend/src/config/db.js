import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/access-refresh-token-topic",
    );
    console.log("Database connected!");
  } catch (error) {
    console.log("Error in connecting db", error);
  }
};
