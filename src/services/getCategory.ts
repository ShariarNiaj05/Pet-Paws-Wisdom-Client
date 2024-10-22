"use server";
import nexiosInstance from "@/config/nexios.config";
import { NexiosResponse } from "nexios-http/types/interfaces";
import { cookies } from "next/headers";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICategoryResponse {
  success: boolean;
  data: ICategory[];
  message: string;
  meta?: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}
const accessToken = cookies().get("accessToken")?.value as string;

export const getCategoryApi = async () => {
  const result = await nexiosInstance.get<NexiosResponse<ICategoryResponse[]>>(
    "/category",
    { headers: { accessToken: accessToken } }
  );
  const data = result?.data?.data;

  // console.log("cateogry resuult", result);
  return data;
};
