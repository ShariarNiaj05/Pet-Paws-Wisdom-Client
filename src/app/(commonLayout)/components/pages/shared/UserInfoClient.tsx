"use client";

import React, { createContext, useContext } from "react";

interface UserContextType {
  email: string;
  role: string;
  _id: string;
  exp?: Date;
  iat?: Date;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserInfoClient({
  email,
  role,
  _id,
  children,
}: UserContextType & { children: React.ReactNode }) {
  const userInfo = {
    email,
    role,
    _id,
  };
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserInfoClient");
  }
  return context;
}
