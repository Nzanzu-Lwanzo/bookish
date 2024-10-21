import { Router } from "express";
import {
  deleteBook,
  getAllBooks,
  getBook,
  saveBooks,
} from "../controllers/books.mjs";
import { getSession, validateParamId } from "../utils/middlewares.mjs";
import { isValidObjectId } from "mongoose";

const booksRouter = Router();

booksRouter.use(getSession);
booksRouter.post("/", saveBooks);
booksRouter.get("/", getAllBooks);
booksRouter.get("/:id", validateParamId, getBook);
booksRouter.delete("/:id", validateParamId, deleteBook);

export default booksRouter;
