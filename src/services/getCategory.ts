import nexiosInstance from "@/config/nexios.config";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICategoryResponse {
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
  const result = await nexiosInstance.get<ICategoryResponse[]>("/category");
  const data = result?.data;

  console.log("cateogry resuult", data);
  return data;
};
