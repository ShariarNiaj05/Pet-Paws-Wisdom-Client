import type { Metadata } from "next";
import NavBar from "./components/pages/shared/Navnar";
import Footer from "./components/pages/shared/Footer";

export const metadata: Metadata = {
  title: "Pet Paws Wisdom",
  description:
    "From essential care advice to inspiring pet tales, Pet Paws Wisdom brings a world of pet love to your fingertips.",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
