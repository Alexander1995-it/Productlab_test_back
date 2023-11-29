import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { productlabRepository } from "../repository/productlab-repository";
import { db } from "../db/db";

const jwt = require("jsonwebtoken");

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
    let foundUser = productlabRepository.findUserByToken(JSON.parse(token));
    console.log(foundUser);
    if (foundUser) {
      const host = req.get("host");
      const protocol = req.protocol;
      const photosWithAbsolutePath = db.photos.map((photo: any) => {
        return {
          ...photo,
          url: `${protocol}://${host}${photo.url}`,
        };
      });
      res.json(photosWithAbsolutePath);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

productlabRouter.get("photos/comment", (req, res) => {
  if (req.query.name) {
    res.json(req.query.name);
  } else {
    res.json("No params");
  }
});

productlabRouter.get("/photos/:id", (req, res) => {
  res.json(req.params.id);
});

productlabRouter.delete("/logout", (req: any, res: any) => {});
