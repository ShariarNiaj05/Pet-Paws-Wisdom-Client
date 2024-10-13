import type { Metadata } from "next";
import "./globals.css";
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
        <UserInfoFetcher>{children}</UserInfoFetcher>
      </body>
    </html>
  );
}
