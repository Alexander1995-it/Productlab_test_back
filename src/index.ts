import express from "express";
import { productlabRouter } from "./routes/productlub";

export const app = express();
// const path = require("path");
// const imagesDirectory = path.join(__dirname, "./public");
app.use(express.static(`${__dirname}/public`));
export const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use((req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (req.path !== "/login" && !authHeader && req.method !== "OPTIONS") {
//     return res.sendStatus(401);
//   }
//   next();
// });

// app.get("/public/image1", (req, res) => {
//   const imagePath = path.join(imagesDirectory, "image1.jpg");
//   res.send(imagePath);
// });

app.use("/", productlabRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
