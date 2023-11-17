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
      url: "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg",
    },
    {
      id: 2,
      name: "b",
      url: "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg",
    },
    {
      id: 3,
      name: "c",
      url: "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg",
    },
    {
      id: 4,
      name: "d",
      url: "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg",
    },
  ],
};
