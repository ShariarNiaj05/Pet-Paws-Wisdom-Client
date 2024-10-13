"use client";

import React, { createContext, useContext } from "react";

interface UserContextType {
  role: string;
  userId: string;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserInfoClient({
  role,
  userId,
  children,
}: UserContextType & { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={{ role, userId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserInfoClient");
  }
  return context;
}
