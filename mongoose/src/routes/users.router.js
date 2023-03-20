import { Router } from "express";
import { trusted } from "mongoose";
import userModel from "../models/user.model.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send({ status: "ok", payload: users });
});

userRouter.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    const createUser = await userModel.create({
      first_name,
      last_name,
      email,
    });

    res.status(201).send({ status: "ok", payload: createUser });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

userRouter.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updateUserData = req.body;

  const updateUser = await userModel.findOneAndUpdate(
    { _id: userId },
    updateUserData,
    { new: true }
  );

  res.status(200).send({ status: "ok", payload: updateUser });
});

userRouter.delete("/:userId", async (req, res) => {
    const { userId } = req.params;

    const deleteUser = await userModel.deleteOne({ _id: userId})

    res.status(200).send({status: 'ok', payload: deleteUser})
});

export default userRouter;
