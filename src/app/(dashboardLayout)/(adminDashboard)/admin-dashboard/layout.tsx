import type { Metadata } from "next";
import { AdminLayout } from "./layout/adminLayout";

export const metadata: Metadata = {
  title: "Pet Paws Wisdom Dashboard",
  description:
    "From essential care advice to inspiring pet tales, Pet Paws Wisdom brings a world of pet love to your fingertips.",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
