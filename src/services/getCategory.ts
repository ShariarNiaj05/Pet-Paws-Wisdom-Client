import nexiosInstance from "@/config/nexios.config";

export const getCategoryApi = () => {
  const result = nexiosInstance.get("/category");
  console.log("cateogry resuult", result);
  return result;
};
