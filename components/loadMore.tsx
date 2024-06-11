"use client";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const LoadMore = ({
  page,
  setParams,
  setFilterParams,
  total,
  totalPage,
  i,
}: {
  page: any;
  setParams: any;
  setFilterParams: any;
  totalPage: any;
  i: any;
  total: any;
}) => {
  const { ref, inView } = useInView();
  const loadMore = async () => {
    // await delay(1000)
    const nextPage = page + 1;
    // const newItems = (await load(nextPage)) ?? [];
    setParams((params: any) => ({ ...params, page: nextPage }));
    setFilterParams((params: any) => ({ ...params, page: nextPage }));
    // setItems((prev: any) => [...prev, data]);
  };
  useEffect(() => {
    if (inView) {
      console.log("y");
      loadMore();
    }
  }, [inView]);
  return (
    <div
      className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
      ref={ref}
    >
      {total === i ? (
        <p className="text-teal-900 font-semibold">No Data to load more :)</p>
      ) : (
        <CircularProgress className="text-teal-900" />
      )}
    </div>
  );
};

export default LoadMore;
