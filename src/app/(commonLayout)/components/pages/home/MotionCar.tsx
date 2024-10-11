"use client";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
export default function MotionCar() {
  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ y: 40, x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="w-3/5 flex justify-end"
    >
      <Image
        alt="Card background"
        className="object-cover p-5 rounded-xl"
        src="../../assets/hero-cat-1.jpg"
        height={500}
        width={750}
      />
    </motion.div>
  );
}
