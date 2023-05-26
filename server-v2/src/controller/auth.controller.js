import { logsignMiddleware } from "../middlewares/auth.middleware.js";

export const loginController = (req, res, next) => {
  logsignMiddleware("loginStrategy")(req, res, next);
};

export const signUpController = (req, res, next) => {
  logsignMiddleware("signupStrategy")(req, res, next);
};

export const logoutController = (req, res) => {
  res.clearCookie("token-cookie");
  res.status(200).json({ message: "Logout successful" });
};
