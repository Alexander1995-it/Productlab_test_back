import express, { Response } from "express";
import { db } from "./db/db";
import { RequestWithBody } from "./types";
import { productlabRepository } from "./repository/courses-repository";

const jwt = require("jsonwebtoken");

const secretKey = "mySecretKey";

export const app = express();
export const jsonBodyMiddleware = express.json();

const productlabRouter = express.Router();

productlabRouter.get("/product", (req, res) => {
  res.json({
    name: "aaa",
    age: "12",
  });
});

productlabRouter.post(
  "/login",
  (
    req: RequestWithBody<{ email: string; password: string }>,
    res: Response<any>,
  ) => {
    let user = productlabRepository.fountLoginAndPassword(
      req.body.email,
      req.body.password,
    );
    if (user) {
      if (user.token) {
        res.json({ ...user, token: user.token });
      } else {
        let token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
        db.users.forEach((el) => {
          if (el.id === user?.id) {
            el.token = token;
          }
        });
        res.json({ ...user, token });
      }
    } else {
      res.status(401).json({ messages: "Incorrect password or login" });
    }
  },
);

app.use(jsonBodyMiddleware);

app.use("/", productlabRouter);
