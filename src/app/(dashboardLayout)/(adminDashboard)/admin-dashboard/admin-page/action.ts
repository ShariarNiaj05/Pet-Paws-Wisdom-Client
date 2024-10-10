/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nexiosInstance from "@/config/nexios.config";
import { revalidateTag } from "next/cache";

export const createPetStory = async (
  _pre: any,
  formData: any
): Promise<any> => {
  try {
    console.log(formData, "formData");

    const newFormData = {
      ...Object.fromEntries(formData),
      rating: Number(Object.fromEntries(formData).rating),
      passengerCapacity: Number(Object.fromEntries(formData).passengerCapacity),
    };

    const res = await nexiosInstance.post("/pet-stories", newFormData);

    revalidateTag("petStoriesTable");

    console.log(res.data, "res.data");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCar = async (_pre: any, formData: any): Promise<any> => {
  try {
    console.log(formData, "formData");

    /*     const newFormData = {
      ...Object.fromEntries(formData),
      rating: Number(Object.fromEntries(formData).rating),
      passengerCapacity: Number(Object.fromEntries(formData).passengerCapacity),
    };

    const res = await nexiosInstance.post("/pet-stories", newFormData);

    revalidateTag("petStoriesTable");

    console.log(res.data, "res.data");

    return res.data; */
  } catch (error) {
    console.log(error);
    throw error;
  }
};
