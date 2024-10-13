import React, { createContext, useContext } from "react";
import { headers } from "next/headers";

interface UserContextType {
  role: string;
  userId: string;
}

const UserContext = createContext<UserContextType | null>(null);

export async function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const role = headersList.get("X-User-Role") || "";
  const userId = headersList.get("X-User-Id") || "";

  return (
    <UserContext.Provider value={{ role, userId }}>
      {children}
    </UserContext.Provider>
  );
}

export async function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
