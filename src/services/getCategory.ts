import nexiosInstance from "@/config/nexios.config";

interface ICategory {
  data: {
    _id?: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
export const getCategoryApi = async () => {
  const result = await nexiosInstance.get<ICategory>("/category");
  const data = result?.data;

  //   console.log("cateogry resuult", data);
  return data;
};
