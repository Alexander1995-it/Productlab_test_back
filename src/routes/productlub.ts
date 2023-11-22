import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { productlabRepository } from "../repository/productlab-repository";
import { db } from "../db/db";

const jwt = require("jsonwebtoken");
const path = require("path");

const secretKey = "mySecretKey";

export const productlabRouter = express.Router({});

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
      let token = jwt.sign(req.body, secretKey, { expiresIn: "1h" });
      db.users.forEach((el) => {
        if (el.id === user?.id) {
          el.token = token;
        }
      });
      res.json(user);
    } else {
      res.status(401).json({ messages: "Incorrect password or login" });
    }
  },
);

productlabRouter.get("/auth/me", (req: any, res) => {
  const authorizationHeader = req.header("Authorization");
  if (authorizationHeader) {
    const [tokenType, token] = authorizationHeader.split(" ");
    let foundUser = productlabRepository.findUserByToken(JSON.parse(token));
    console.log("foundUser", foundUser);
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.sendStatus(401);
    }
  }
});

productlabRouter.get("/photos", (req, res) => {
  const authorizationHeader = req.header("Authorization");
  if (authorizationHeader) {
    const [tokenType, token] = authorizationHeader.split(" ");
    if (token === JSON.stringify(db.users[0].token)) {
      res.json(db.photos);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

productlabRouter.delete("/logout", (req: any, res: any) => {});
