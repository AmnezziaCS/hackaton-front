import usersData from "../data/users.json";
import type { User } from "../types/auth";

export async function getUsers(): Promise<User[]> {
  return usersData as User[];
}
