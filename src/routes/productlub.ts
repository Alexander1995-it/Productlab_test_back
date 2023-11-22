import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { productlabRepository } from "../repository/productlab-repository";
import { db } from "../db/db";

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const imagesDirectory = path.join(__dirname, "./../public");

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

// productlabRouter.get("/photos", (req, res) => {
//   const imagePath = path.join(imagesDirectory, "image1.jpg");
//   res.send(imagePath);
//   const authorizationHeader = req.header("Authorization");
//   if (authorizationHeader) {
//     // const imagePath = path.join(imagesDirectory, "image1.jpg");
//     // res.sendFile(imagePath);
//     const [tokenType, token] = authorizationHeader.split(" ");
//     let foundUser = productlabRepository.findUserByToken(JSON.parse(token));
//     if (foundUser) {
//       res.json("/public/image1.jpg");
//     } else {
//       res.sendStatus(401);
//     }
//   } else {
//     res.sendStatus(401);
//   }
// });

productlabRouter.get("/photos", (req, res) => {
  const imagePath = path.join(imagesDirectory, "image1.jpg");
  const imageUrl = `/images/image1.jpg`;
  const imgData = fs.readFileSync(imagePath, { encoding: "base64" });
  const imgSrc = `data:image/jpeg;base64,${imgData}`;
  res.send("http://localhost:3002/image1.jpg");
});

productlabRouter.delete("/logout", (req: any, res: any) => {});
