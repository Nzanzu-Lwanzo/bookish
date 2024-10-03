import { Router } from "express";
import { saveBooksCollections } from "../controllers/booksCollections.mjs";
import { getSession } from "../utils/middlewares.mjs";

const booksCollectionsRouter = Router();

booksCollectionsRouter.use(getSession);
booksCollectionsRouter.post("/", saveBooksCollections);

export default booksCollectionsRouter;
