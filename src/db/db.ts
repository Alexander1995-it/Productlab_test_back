export type dbType = {
  users: Array<{ id: number; email: string; password: string; token?: string }>;
  photos: any;
};

export const db: dbType = {
  users: [{ id: 1, email: "admin@gmail.com", password: "admin" }],
  photos: [
    {
      id: 1,
      name: "a",
      url: "/image_1.jpg",
    },
    {
      id: 2,
      name: "b",
      url: "/image_2.jpg",
    },
    {
      id: 3,
      name: "c",
      url: "/image_3.jpg",
    },
    {
      id: 4,
      name: "d",
      url: "/image_4.jpg",
    },
  ],
};
