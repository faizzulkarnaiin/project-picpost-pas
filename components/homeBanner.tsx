"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = ["Forest", "Building", "Tree", "Color"];
export default function HomeBanner() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1500 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-8 gap-9 w-full h-[600px] md:h-[600px] bg-slate-50-500 mt-8 mb-12 rounded-md justify-center md:justify-between items-center  px-6 lg:px-16">
        <div className="flex flex-col w-full lg:w-[25%] gap-6">
          <h3 className="md:text-4xl text-xl">
            Find the best thing that you could fine <TextTransition springConfig={presets.default}>{TEXTS[index % TEXTS.length]}</TextTransition>
          </h3>
          <p className="md:text-md text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
            dignissimos unde nesciunt inventore totam rem deserunt id non
            doloremque distinctio? Earum molestias perspiciatis, vel eveniet
            aliquid ab optio debitis vero.
          </p>
          <Link href={"main/shop"}>
            <button className="btn text-white w-32">Shop now</button>
          </Link>
        </div>
        <div className="bg-slate-400 md:w-[450px]  w-full h-[250px] md:h-[450px]"></div>
      </div>
    </>
  );
}
