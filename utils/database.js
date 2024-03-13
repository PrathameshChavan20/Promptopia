import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }

  try {
   await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "share_prompt",
    });

    isConnected = true;

    console.log("MongoDB Database connected.");
  } catch (error) {
    console.log(error);
  }
};
