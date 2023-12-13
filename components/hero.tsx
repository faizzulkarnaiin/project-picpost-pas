"use client"
import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["  Forest", "  Building",   "Tree", "  Color"];

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1500 
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div className="w-full h-[530px] bg-teal-900 mt-4  flex md:flex-row flex-col items-center justify-between px-10 py-6 md:py-0 md:px-16 rounded-b-[50%10%]">
      <div className="flex flex-col gap-6">
        <h2 className="md:text-5xl text-4xl font-bold text-white">
          We Bring The Store <br /> to your door
        </h2>
        <p className="text-slate-100 flex">
          Get Organic product and suistainably  sourced 
          groceries at like
        <span className="pl-2"> </span>

        </p>
        <button className="btn border-none w-[200px] font-bold text-teal-900 bg-green-400 ">
          Shop now
        </button>
      </div>
      <div className="">
        <h2>wadawd</h2>
      </div>
    </div>
  );
}

export default Hero;
