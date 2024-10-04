import express from "express";
import authRouter from "./router/authRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import fileRouter from "./router/fileRouter.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("api/v1/auth", authRouter);
app.use("api/v1/file", fileRouter);

export default app;
