import type { Metadata } from "next";
import { UserLayout } from "./layout/userLayout";

export const metadata: Metadata = {
  title: "Pet Paws Wisdom Dashboard",
  description:
    "From essential care advice to inspiring pet tales, Pet Paws Wisdom brings a world of pet love to your fingertips.",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserLayout>{children}</UserLayout>
    </div>
  );
}
