"use client";
import { useUser } from "@/context/user.provider";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const BannerButton = () => {
  const { user } = useUser();
  return (
    <div className="space-x-4">
      <Button onClick={() => console.log("Hello")} color="primary" radius="sm">
        <Link href={"/"}>See Stories</Link>
      </Button>
    </div>
  );
};

export default BannerButton;
