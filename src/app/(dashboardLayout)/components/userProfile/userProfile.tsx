"use client";
import { useUser } from "@/context/user.provider";
import { useState } from "react";

const userProfile = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return <div></div>;
};

export default userProfile;
