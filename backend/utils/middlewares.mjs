import { validationResult, matchedData } from "express-validator";
import { parseToken } from "./authTokens.mjs";

export const getValidData = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty) return res.json(result.array());

  req.getValidData = () => matchedData(req);

  next();
};

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getSession = (req,res,next) => {

  const cookies = req.cookies;

  if(!cookies?.at) return res.sendStatus(401);

  req.user = parseToken(cookies.at);

  next();

}