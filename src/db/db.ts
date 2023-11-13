export type dbType = {
  users: Array<{ id: number; email: string; password: string; token?: string }>;
  photos: any;
};

export const db: dbType = {
  users: [{ id: 1, email: "admin", password: "admin1" }],
  photos: [
    {
      id: 2,
      url: "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg",
    },
  ],
};
