import express from "express";
import { productlabRouter } from "./routes/productlub";

export const app = express();
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use("/", productlabRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
