import express from "express";
import { productlabRouter } from "./routes/productlub";

export const app = express();

app.use(express.static("db/images"));

export const jsonBodyMiddleware = express.json();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(jsonBodyMiddleware);

app.use("/", productlabRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});