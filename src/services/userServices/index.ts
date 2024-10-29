import nexiosInstance from "@/config/nexios.config";

export const getUserProfileApi = async (userId: string) => {
  try {
    const response = await nexiosInstance.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile.");
  }
};
