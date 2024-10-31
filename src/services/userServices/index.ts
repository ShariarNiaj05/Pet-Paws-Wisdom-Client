"use server";

import nexiosInstance from "@/config/nexios.config";
import { cookies } from "next/headers";
const accessToken = cookies().get("accessToken")?.value as string;
export const getUserProfileApi = async (userId: string) => {
  try {
    const response = await nexiosInstance.get(`/users/${userId}`);
    console.log("response user data", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
};

export const updateUserProfileApi = async (
  userId: string,
  formData: FormData
) => {
  try {
    const response = await nexiosInstance.put(`/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accessToken: accessToken,
      },
    });

    console.log("response is api", response);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile.");
  }
};
