"use client";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/material";
import React from "react";
import { useSession } from "next-auth/react";
import useAppModule from "../post/lib";
import Link from "next/link";

const page = () => {
  const { data: session, status } = useSession();
  const { useLikedPostList, useDetailPost } = useAppModule();
  const {
    data: liked,
    isFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
  } = useLikedPostList();
  console.log(liked, "liked");
  return (
    <div>
      <div className="p-8">
        <h2 className="text-teal-900 font-semibold text-2xl">Liked Post !</h2>
      </div>
      <div className="w-screen h-screen flex flex-col justify-start items-center px-6 ">
        <Box sx={{ width: "100%" }}>
          <Masonry columns={{ xs: 2, sm: 3, md: 6 }} spacing={2}>
            {liked?.data?.map((item: any, index: any) => {
              return (
                <Link href={`/user/post/detail/${item.id}`} key={index}>
                <div
                  className="bg-white"
                  onClick={() => {
                    // (document as any)?.getElementById("my_modal_3").showModal();
                  }}
                >
                  <img
                    // className={`h-${item}`}
                    srcSet={`${item.post_id.images[0].url}`}
                    src={`${item.post_id.images[0].url}`}
                    alt={item.judul}
                    loading="lazy"
                    style={{
                      // borderTopLeftRadius: 4,
                      // borderTopRightRadius: 4,
                      borderRadius: 10,
                      display: "block",
                      width: "100%",
                    }}
                  />

                  <div className="flex flex-col gap-2 justify-start ">
                    {/* <h3 className="font-thin line-clamp-1">{item.judul}</h3> */}
                    <p className="text-black/80 font-medium line-clamp-1 text-sm pt-3">
                      {item.post_id.konten}
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <div className="">
                        <img
                          className=" w-8 rounded-full"
                          src={
                            item.post_id.created_by.avatar
                              ? item.post_id.created_by.avatar
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                          }
                          alt={item.post_id.title}
                        />
                      </div>
                      <p className="line-clamp-1  text-gray-600 text-sm">
                        {item.post_id.created_by.nama}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </Masonry>
        </Box>
      </div>
    </div>
  );
};

export default page;
