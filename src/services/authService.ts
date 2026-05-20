import usersData from "../data/users.json";
import type { User } from "../types/auth";

const AUTH_USER_KEY = "auth_user";

export function getStoredUser(): User | null {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
}

export function storeUser(user: User): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_USER_KEY);
}

export async function loginWithEmailPassword(
  email: string,
  password: string,
): Promise<User | null> {
  const users = usersData as User[];
  const foundUser = users.find((user) => user.email === email && user.password === password);
  return foundUser ?? null;
}
