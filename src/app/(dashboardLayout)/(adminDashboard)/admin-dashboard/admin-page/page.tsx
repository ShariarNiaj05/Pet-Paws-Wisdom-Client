/* eslint-disable @typescript-eslint/no-explicit-any */
// import nexiosInstance from "@/config/nexios.config";
import AddCar from "./components/AddCar";

const PetStoriesManagement = async () => {
  // const res: any = await nexiosInstance.get("/pet-stories", {
  //   next: {
  //     tags: ["petStoriesTable"],
  //   },
  // });

  return (
    <>
      <AddCar />

      {/*  {res?.data?.data?.map((car: any) => (
        <div key={car._id}>
          <h1>{car.name}</h1>
        </div>
      ))} */}
    </>
  );
};

export default PetStoriesManagement;
