"use client";
import { Button } from "@nextui-org/react";

const BannerButton = () => {
  return (
    <div className="space-x-4">
      <Button onClick={() => console.log("Hello")} color="primary" radius="sm">
        See Stories
      </Button>
      <Button color="primary" variant="bordered" radius="sm">
        Share Stories
      </Button>
    </div>
  );
};

export default BannerButton;
