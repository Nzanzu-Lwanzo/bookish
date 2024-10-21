import User from "../../db/models/user.mjs";
import { generateToken } from "../../utils/authTokens.mjs";

let env = process.env.ENV;
export let cookiesMaxAge = 60 * 60 * 24 * 30 * 1500;

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const authenticateUser = async (req, res) => {
  const user = {
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  let authToken = generateToken(user);

  res
    .cookie("at", authToken, {
      maxAge: cookiesMaxAge,
      httpOnly: env !== "dev",
      secure: env !== "dev",
    })
    .json(user);
};
