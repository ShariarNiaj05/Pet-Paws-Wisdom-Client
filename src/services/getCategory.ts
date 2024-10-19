import nexiosInstance from "@/config/nexios.config";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICategoryResponse {
  data: ICategory;
}
export const getCategoryApi = async () => {
  const result = await nexiosInstance.get<ICategoryResponse[]>("/category");
  const data = result?.data?.data;

  console.log("cateogry resuult", data);
  return data;
};
