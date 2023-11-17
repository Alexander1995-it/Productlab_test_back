import { db } from "../db/db";

export const productlabRepository = {
  fountLoginAndPassword(email: string, password: string) {
    let user = db.users.find(
      (el) => el.email === email && el.password === password,
    );
    return user;
  },
  findUserByToken(token: string) {
    let user = db.users.find((el) => {
      return el.token === token;
    });
    return user;
  },
};
