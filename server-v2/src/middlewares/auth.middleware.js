import passport from "passport";
import { generateToken } from "../utils.js";

export const authMiddleware = (strategy, obj) => {
  const session = { ...obj };
  const passportAuthenticate = async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (session.session === true && !user)
        return res.status(401).json({ message: info ? info.message : "Error" });
      req.user = user;
      next();
    })(req, res, next);
  };
  return passportAuthenticate;
};

export const logsignMiddleware = (strategy) => {
  const passportStrategy = async (req, res, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      (err, payload, info) => {
        if (err) return next(err);
        if (!payload)
          return res
            .status(400)
            .json({ message: info ? info.message : "Error" });
        const token = generateToken(payload);
        res.cookie("token-cookie", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.redirect("/perfil");
      }
    )(req, res, next);
  };
  return passportStrategy;
};

export const authorizeMiddleware = (role) => {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Usuario sin permisos" });
    }
    next();
  };
};
