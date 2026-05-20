export type UserRole = "STUDENT" | "COMPANY" | "SCHOOL" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  status: "ACTIVE" | "SUSPENDED";
};
