import { RequestWithBody } from "../types";
import express, { Response } from "express";
import { dbType } from "../db/db";
import { productlabRepository } from "../repository/courses-repository";

export const getProductlabRoutes = (db: dbType) => {
  const productlabRouter = express.Router();

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
        res.json(user);
      } else {
        res.status(401).json({ messages: "Incorrect password or login" });
      }
    },
  );

  return productlabRouter;
};
