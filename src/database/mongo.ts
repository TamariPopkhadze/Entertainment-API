import mongoose from "mongoose";

const connect = () => {
  const  URL = `${process.env.MONGO_URL}`
  try {
    mongoose.set("strictQuery", true);
    return mongoose.connect(URL);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default connect;