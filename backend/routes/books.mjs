import { Router } from "express";
import { saveBooks } from "../controllers/books.mjs";
import { getSession } from "../utils/middlewares.mjs";

const booksRouter = Router();

booksRouter.use(getSession);
booksRouter.post("/",saveBooks);

export default booksRouter;
