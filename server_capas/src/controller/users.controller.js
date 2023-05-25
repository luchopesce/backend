import { getAllUsers } from "../service/users.service.js";

export const getUsersController = (req, res) => {
  const result = getAllUsers();
  res.json({ status: "success", payload: result });
};
