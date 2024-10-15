"use server";

import nexiosInstance from "@/config/nexios.config";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
