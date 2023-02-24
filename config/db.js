import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;
  } catch (error) {
    console.log("error aca", error.message);
    process.exit(1);
  }
};

export default connectDb;
