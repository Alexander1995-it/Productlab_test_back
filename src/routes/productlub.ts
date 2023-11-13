import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { productlabRepository } from "../repository/courses-repository";
import { db } from "../db/db";

const jwt = require("jsonwebtoken");

const secretKey = "mySecretKey";

export const productlabRouter = express.Router({});

productlabRouter.get("/", (req, res) => {
  res.json({
    name: "/",
    age: "/",
  });
});

productlabRouter.get("/photos", (req, res) => {
  const authorizationHeader = req.header("Authorization");
  if (authorizationHeader) {
    const [tokenType, token] = authorizationHeader.split(" ");
    if (token === db.users[0].token) {
      res.json(db.photos);
    } else {
      res.status(401);
    }
  }
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

productlabRouter.delete("/logout", (req: any, res: any) => {});
