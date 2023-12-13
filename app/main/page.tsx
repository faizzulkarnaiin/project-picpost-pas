"use client";
import BestTemplateBanner from "@/components/bestBanner";
import CenterText from "@/components/centertext";
import CommentCard from "@/components/commentCard";
import HomeBanner from "@/components/homeBanner";
import MainBanner from "@/components/mainBanner";
import Navbar from "@/components/navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Switch from "@mui/material/Switch";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";

export default function Project() {
  return (
    <>
      <div className="flex flex-col  mx-3 md:mx-12 overflow-x-hidden  ">
        <Navbar />
        <HomeBanner />
        <BestTemplateBanner />
        <CenterText text="What People say about us"></CenterText>
        <div className="w-full flex flex-row gap-6 overflow-x-scroll scrollbar-none">
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
            job="graphic desainder"
          />
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
          />
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
            job="2424"
          />
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
          />
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
          />
          <CommentCard
            name="muhammad faiz"
            comment="Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny."
          />
          
        </div>
        <CenterText text="Our Partner"></CenterText>
      </div>
    </>
  );
}
