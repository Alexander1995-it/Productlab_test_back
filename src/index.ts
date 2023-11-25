import express from "express";
import { productlabRouter } from "./routes/productlub";

export const app = express();
app.use(express.static(`${__dirname}/images`));
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (req.path.startsWith("/images")) {
    return next();
  }
  if (
    (req.path !== "/login" && !authHeader && req.method !== "OPTIONS") ||
    (req.headers.accept &&
      (req.headers.accept.includes("image/") ||
        req.headers.accept.includes("text/")))
  ) {
    return res.sendStatus(401);
  }
  next();
});

app.use("/", productlabRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
