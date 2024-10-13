import { headers } from "next/headers";
import { UserInfoClient } from "./UserInfoClient";

export function UserInfoFetcher({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const role = headersList.get("X-User-Role") || "";
  const userId = headersList.get("X-User-Id") || "";

  return (
    <UserInfoClient role={role} userId={userId}>
      {children}
    </UserInfoClient>
  );
}
