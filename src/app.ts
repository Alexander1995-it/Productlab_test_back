import express from "express";
import { getProductlabRoutes } from "./routes/productlub";
import { db } from "./db/db";

export const app = express();
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use("/", getProductlabRoutes(db));
