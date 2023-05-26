import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../models/user.model.js";
import { createHashB, isValidPassword, cookieExtractor } from "../utils.js";
import jwt from "passport-jwt";
import { options } from "./options.config.js";

const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initialzedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name } = req.body;
          const user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          } else {
            let role;
            if (username.endsWith("@coder.com")) {
              role = "admin";
            }
            const newUser = {
              first_name: first_name,
              last_name: last_name,
              email: username,
              password: createHashB(password),
              role: role,
            };
            let payload = await userModel.create(newUser);
            payload = {
              email: payload.email,
              first_name: payload.first_name,
              last_name: payload.last_name,
              role: payload.role,
            };
            return done(null, payload);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "loginStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          else {
            const payload = {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role,
            };
            return done(null, payload);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: options.token.secretKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export { initialzedPassport };
