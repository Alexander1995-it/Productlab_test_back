export type dbType = {
  users: Array<{ id: number; email: string; password: string; token?: string }>;
  photos: any;
};

export const db: dbType = {
  users: [{ id: 1, email: "admin", password: "admin1" }],
  photos: [
    {
      id: 1,
      url: "images/image_1.jpg",
    },
  ],
};
