export type dbType = {
  courses: Array<{ id: number; title: string }>;
  users: Array<{ id: number; email: string; password: string; token?: string }>;
};
export const db: dbType = {
  courses: [
    { id: 1, title: "Frontend" },
    { id: 2, title: "Backend" },
    { id: 3, title: "QA" },
    { id: 4, title: "DDevops" },
  ],
  users: [{ id: 1, email: "admin", password: "admin1" }],
};
