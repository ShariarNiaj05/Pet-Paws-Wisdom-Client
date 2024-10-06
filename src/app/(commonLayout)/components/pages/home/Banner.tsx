import { Card, CardBody } from "@nextui-org/react";
import MotionCar from "./MotionCar";
import BannerButton from "./BannerButton";
export default function Banner() {
  return (
    <Card className="py-4 flex" shadow="none">
      <CardBody className="overflow-visible py-2 ">
        <div className="flex items-center justify-between">
          <div className="w-2/5">
            <h1 className="text-6xl font-bold mb-2 text-default-900">
              A world of{" "}
              <span className="text-primary">
                love, care, and heartwarming{" "}
              </span>
              stories for your beloved{" "}
              <span className="text-text-primary">pets</span>
            </h1>
            <h4 className="text-xl text-gray-500 my-4">
              From essential care advice to inspiring pet tales, Pet Paws Wisdom
              brings a world of pet love to your fingertips.
            </h4>
            <BannerButton />
          </div>
          <MotionCar />
        </div>
      </CardBody>
    </Card>
  );
}
