import { UserInfoClient } from "./UserInfoClient";

export function UserInfoFetcher({ children }: { children: React.ReactNode }) {
  const { email, role, _id } = localStorage.getItem("userInfo");

  return (
    <UserInfoClient email={email} role={role} _id={_id}>
      {children}
    </UserInfoClient>
  );
}
