import nexiosInstance from "@/config/nexios.config";
import { NexiosResponse } from "nexios-http/types/interfaces";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ICategoryResponse {
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

export const getCategoryApi = async () => {
  const result = await nexiosInstance.get<NexiosResponse<ICategoryResponse[]>>(
    "/category"
  );
  // const result = await axiosSecureInstance.get("/category");
  const data = result?.data?.data;

  // console.log("cateogry resuult", result);
  return data;
};
