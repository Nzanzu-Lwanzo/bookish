import dotenv from "dotenv";
dotenv.config();
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import authRouter from "./backend/auth/routes/auth.mjs";
import booksRouter from "./backend/routes/books.mjs";
import booksCollectionsRouter from "./backend/routes/booksCollections.mjs";

let env = process.env.ENV || 'prod';
let __dirname = dirname(fileURLToPath(import.meta.url));
const App = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const WHITELIST_ORIGINS = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://bookish-app.onrender.com",
];

App.use(express.json());
App.use(express.static(join(__dirname, "/frontend/dist")));
App.use(cookieParser(SECRET));
App.use(
  cors({
    origin: WHITELIST_ORIGINS,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
App.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      httpOnly: env !== "dev",
      secure: env !== "dev",
      maxAge: 30 * 24 * 60 * 60,
      signed: true,
    },
  })
);
App.use(passport.initialize());
App.use(passport.session());

App.use("/api/auth", authRouter);
App.use("/api/collection", booksCollectionsRouter);
App.use("/api/book", booksRouter);

App.get("*", (req, res) => res.sendFile("/index.html"));

App.listen(PORT, () => {

  mongoose
    .connect(MONGODB_URI,{
      dbName : "bookish"
    })
    .then(() => console.log("READY TO PROCESS REQUESTS ..."))
    .catch((e) => console.log("CANNOT CONNECT TO DB : ", e.message));
});
