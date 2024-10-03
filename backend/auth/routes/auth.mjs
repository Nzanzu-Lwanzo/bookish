import { Router } from "express";
import { body, checkSchema } from "express-validator";
import { userSchema } from "../../utils/validationSchemas.mjs";
import { getValidData } from "../../utils/middlewares.mjs";
import { authenticateUser } from "../controllers/auth.mjs";
import passport from "passport";
import "../strategies/local.mjs";

const authRouter = Router();

authRouter.post("/", passport.authenticate("local"), authenticateUser);

export default authRouter;
