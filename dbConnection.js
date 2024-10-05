import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);
    if (connection) {
      console.log(`Database connected successfully on ${connection.host}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
