import dotenv from "dotenv";

import { app } from "./app.js";
import connectDB from "./../db/connectDB.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("Server running on PORT:", process.env.PORT);
    });
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1);
  }
};

startServer()