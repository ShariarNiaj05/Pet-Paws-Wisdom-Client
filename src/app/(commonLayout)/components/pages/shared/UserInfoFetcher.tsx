"use client";
import { useEffect, useState } from "react";
import { UserInfoClient } from "./UserInfoClient";

export function UserInfoFetcher({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    role: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  /* if (!userInfo) {
    return <p>Loading...</p>;
  } */

  const { email, role, _id } = userInfo;

  return (
    <UserInfoClient email={email} role={role} _id={_id}>
      {children}
    </UserInfoClient>
  );
}
