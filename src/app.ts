import express from "express";
import { productlabRouter } from "./routes/productlub";

export const app = express();
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use("/", productlabRouter);
