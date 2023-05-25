import { getAllToys, createToy } from "../service/toys.service.js";

export const getToysController = (req, res) => {
  const result = getAllToys();
  res.json({ status: "success", payload: result });
};

export const createToyController = (req, res) => {
  const result = createToy(req.body);
  res.json({ status: "success", payload: result });
};
