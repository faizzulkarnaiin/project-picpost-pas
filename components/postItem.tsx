"use client";
import { useState } from "react";

const PostItem = ({ item }: { item: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="bg-white relative"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ width: "100%", height: 829, borderRadius: 10 }}
    >
      <div
        className={`h-full w-full rounded-xl shadow-xl transition-all duration-500 ${
          isFlipped ? "transform rotateY(180deg)" : ""
        }`}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      >
        {/* Bagian Depan */}
        <div className="absolute inset-0">
          <img
            className="h-full w-full rounded-xl object-cover shadow-xl"
            src={item.images[0].url}
            alt={item.judul}
            loading="lazy"
          />
        </div>

        {/* Bagian Belakang */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 transform rotateY(180deg) backface-visibility:hidden">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">{item.judul}</h1>
            <p className="text-lg">Photographer & Art</p>
            <p className="text-base">{item.konten}</p>
            <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem