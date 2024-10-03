import dotenv from "dotenv";
dotenv.config();
import * as pkg from "jsonwebtoken";
const {
  default: { sign, verify },
} = pkg;

const SECRET = process.env.SECRET;

export const generateToken = (payload) => sign(payload, SECRET, { expiresIn: "30d" });

export const parseToken = (token) => verify(token,SECRET);
