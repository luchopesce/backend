import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.config.js";

const secretKeytoken = options.token.secretKey;
//path
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export function createHashB(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export function isValidPassword(user, logPassword) {
  return bcrypt.compareSync(logPassword, user.password);
}

export function generateToken(user) {
  const token = jwt.sign(user, secretKeytoken, {
    expiresIn: "24h",
  });
  return token;
}

export const cookieExtractor = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  let token = null;
  if (tokenHeader) {
    token = tokenHeader.split(" ")[1];
  } else {
    token = req.cookies["token-cookie"];
  }
  return token;
};
