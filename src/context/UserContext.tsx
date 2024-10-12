/* eslint-disable @typescript-eslint/no-explicit-any */
// context/UserContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Define the shape of your user context
interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to access user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Context provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if the user is already authenticated via cookies or tokens
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    console.log("Access token from cookies:", accessToken);

    if (accessToken) {
      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser); // Set the decoded user
    }
  }, []);
  console.log("useUser from provider", user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
