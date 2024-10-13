import type { Metadata } from "next";
import "./globals.css";
import { UserInfoClient } from "./(commonLayout)/components/pages/shared/UserInfoClient";
import { UserInfoFetcher } from "./(commonLayout)/components/pages/shared/UserInfoFetcher";

export const metadata: Metadata = {
  title: "Pet Paws Wisdom",
  description:
    "From essential care advice to inspiring pet tales, Pet Paws Wisdom brings a world of pet love to your fingertips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserInfoFetcher>
          {(role, userId) => (
            <UserInfoClient role={role} userId={userId}>
              {children}
            </UserInfoClient>
          )}
        </UserInfoFetcher>
      </body>
    </html>
  );
}
