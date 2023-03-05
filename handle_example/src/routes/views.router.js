import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  const user = [
    {
      firstname: "Luciano",
      lastname: "Pesce",
    },
  ];

  let number = Math.floor(Math.random() * user.length);
  console.log(number);

  res.render("home", user[number]);
});

viewsRouter.get("/foods", (req, res) => {
  const foods = [
    {
      name: "Manzanas",
      price: 25,
    },
    {
      name: "Banana",
      price: 15,
    },
    {
      name: "Pera",
      price: 20,
    },
    {
      name: "Sandia",
      price: 44,
    },
  ];

  const user = [
    {
      firstname: "Luciano",
      lastname: "Pesce",
      role: true,
    },
  ];

  res.render("foods", { foods, role: user[0].role });
});

export default viewsRouter;
