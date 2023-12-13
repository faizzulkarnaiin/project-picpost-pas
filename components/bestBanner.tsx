"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function BestTemplateBanner() {
  const [showCountUp, setShowCountUp] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !showCountUp) {
      setShowCountUp(true);
    }
  }, [inView, showCountUp]);
  return (
    <>
      <div className="w-full h-[600px] flex gap-2 justify-center items-center md:mb-1 mb-12 mt-16 md:mt-28">
        <div className="w-full h-full flex justify-between gap-12 items-center md:items-start flex-col-reverse md:flex-row px-1 md:px-36">
          <div className="lg:w-[450px]  w-full h-[450px] bg-red-600 indicator">
            <div className="indicator-item indicator-bottom w-auto p-4 h-[80px] text-white bg-black flex gap-4 justify-center mt-2 px-3 items-center">
              <p ref={ref}>
                More than{" "}
                {showCountUp ? (
                  <CountUp start={0} end={200} duration={5} />
                ) : null}{" "}
                k sellers
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-[80%]  pt-8 md:items-start items-center">
            <h5 className="text-4xl font-semibold mb-6">
              Best Website Since 2014
            </h5>
            <p className="lg:w-[70%] w-full">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
              ratione vel, eaque et possimus suscipit provident modi explicabo
              velit quam rerum voluptatum, quos ad, voluptate beatae totam odio
              delectus. Ipsum?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
