import Box from "@/components/Box";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ClassNames } from "@emotion/react";
export default function MainShop() {
  return (
    <>
      <div className="mx-4 mb-60 overflow-x-hidden">
        <Navbar />
        <Hero/>
        <div className="flex gap-4 overflow-x-auto p-5 mt-8">
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
      
        </div>
      </div>
    </>
  );
}
