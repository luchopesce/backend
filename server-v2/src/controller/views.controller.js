import { io } from "../app.js";
import { ProductManager } from "../dao/product.dao.js";

export const productsControllerViews = async (req, res) => {
  const user = req.user;

  const sendMessage = async (data) => {
    let options = {
      lean: true,
      limit: 2,
      sort: { price: "asc" },
    };
    if (data) {
      options.page = data;
    }
    const paginate = await ProductManager.paginateProducts({}, options);
    io.emit("list-products", paginate);
  };

  io.on("connection", (socket) => {
    socket.on("page", (data) => {
      sendMessage(data);
    });
    sendMessage();
  });

  res.render("products", user);
};

export const homeControllerViews = (req, res) => {
  res.render("home");
};

export const loginControllerViews = (req, res) => {
  const user = req.user;
  if (user) {
    res.redirect("/perfil");
  } else {
    res.render("login");
  }
};

export const signupControllerViews = (req, res) => {
  const user = req.user;
  if (user) {
    res.redirect("/perfil");
  } else {
    res.render("signup");
  }
};

export const perfilControllerViews = (req, res) => {
  const user = req.user;
  res.render("perfil", user);
};
