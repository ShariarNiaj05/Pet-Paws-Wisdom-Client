import { headers } from "next/headers";
import { UserInfoClient } from "./UserInfoClient";

export function UserInfoFetcher() {
  const headersList = headers();
  const role = headersList.get("X-User-Role") || "";
  const userId = headersList.get("X-User-Id") || "";

  // This component doesn't render anything visible
  // It just passes the data to a client component
  return <UserInfoClient role={role} userId={userId} />;
}
