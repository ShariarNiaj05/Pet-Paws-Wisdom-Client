/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { cookies } from "next/headers";

export const loginUser = async (userData) => {
  try {
    const { data } = await nexiosInstance.post("/auth/login", userData);
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
};
