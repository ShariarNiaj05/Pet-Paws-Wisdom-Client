/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { cookies } from "next/headers";

type IContent = {
  author: string;
  title: string;
  body: string;
  category: string;
  tags?: string[];
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  createdAt?: Date;
  updatedAt?: Date;
};
interface ServiceResponse {
  success: boolean;
  token?: string;
  message: string;
  data: IContent;
}

const accessToken = cookies().get("accessToken")?.value as string;

export const createContentApi = async (
  // axiosSecure,
  payload: Partial<IContent>
  // userId: string
) => {
  try {
    console.log("backend call response", payload);
    const response = await nexiosInstance.post<ServiceResponse>(
      "/content",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Error in createContentApi:", error);
    if (error.response) {
      console.error("Response data createContentApi:", error.response.data);
      console.error("Response status createContentApi:", error.response.status);
      console.error(
        "Response headers createContentApi:",
        error.response.headers
      );
    }
  }
};

/* export const loginUser = async (userData: any) => {
  try {
    const { data } = await nexiosInstance.post<AuthResponse>(
      "/auth/login",
      userData
    );
    console.log("login user info", data);
    if (!data) {
      throw new Error("Nothing found");
    }
    console.log("user data in auth service file", data);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}; */

/* export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      //   name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};
 */
