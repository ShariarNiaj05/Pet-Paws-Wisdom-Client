import nexiosInstance from "@/config/nexios.config";

export const getCategoryApi = async () => {
  const result = await nexiosInstance.get("/category");
  console.log("cateogry resuult", result);
  return result;
};
