import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  clearStoredUser,
  getStoredUser,
  loginWithEmailPassword,
  storeUser,
} from "../services/authService";
import type { User } from "../types/auth";

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = await loginWithEmailPassword(email, password);
    if (!foundUser) return false;

    storeUser(foundUser);
    setUser(foundUser);
    return true;
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
