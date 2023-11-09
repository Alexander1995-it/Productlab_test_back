import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { dbType } from "../db/db";
import { productlabRepository } from "../repository/courses-repository";

const jwt = require("jsonwebtoken");

const secretKey = "mySecretKey";

export const getProductlabRoutes = (db: dbType) => {
  const productlabRouter = express.Router();

  productlabRouter.get("/", (req, res) => {
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
        let token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
        if (user.token) {
          token = user.token;
        } else {
          db.users.forEach((el) => {
            if (el.id === user?.id) {
              el.token = token;
            }
          });
        }
        res.json({ ...user, token });
      } else {
        res.status(401).json({ messages: "Incorrect password or login" });
      }
    },
  );

  return productlabRouter;
};
