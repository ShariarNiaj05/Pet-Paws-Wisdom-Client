import { UserInfoClient } from "./UserInfoClient";

export function UserInfoFetcher({ children }: { children: React.ReactNode }) {
  const userInfo = localStorage.getItem("userInfo");

  return <UserInfoClient userInfo={userInfo}>{children}</UserInfoClient>;
}
