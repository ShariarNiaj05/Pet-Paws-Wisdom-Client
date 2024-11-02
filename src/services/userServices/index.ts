/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { cookies } from "next/headers";

const accessToken = cookies().get("accessToken")?.value as string;
export const getUserProfileApi = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await nexiosInstance.get(`/users/${userId}`);
    console.log("response response", response);
    return response.data || null;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

export const updateUserProfileApi = async (
  userId: string,
  formData: FormData
) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!accessToken) {
    throw new Error("Authentication required");
  }
  try {
    const response = await nexiosInstance.put(`/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accessToken: accessToken,
      },
    });

    console.log("response is api", response);
    return response.data || null;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile.");
  }
};
