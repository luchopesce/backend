import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.router.js   ";

const app = express();

app.use(express.json())
app.use('/api/users', userRouter)

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

mongoose
  .connect(
    "mongodb+srv://luchopesce96:chacabuco14@codercluster.r8atrkr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to DB");
  });
