import mongoose from "mongoose";

/*=========================================*/
/*=========================================*/
/*=========================================*/

// Mongo db connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to database ...");
  } catch (error) {
    console.log("connection error", error.message);
  }
}

export default connectDB;