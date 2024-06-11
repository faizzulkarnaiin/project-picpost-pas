"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Box, CircularProgress, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAppModule from "./lib";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadMore from "@/components/loadMore";
import useAuthModule from "@/app/auth/lib";
const Page = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  console.log(session);
  const { usePostList } = useAppModule();
  const router = useRouter();
  // const {
  //   data: detail,
  //   isFetching: detailIsFetching,
  //   isLoading: detailIsLoading,
  // } = useDetailPost();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching: isF } = useProfile();

  const {
    data: post,
    isFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
    fetchMoreData,
    setFilterParams,
  } = usePostList();
  const fetchMorePosts = () => {
    fetchMoreData(page);
    setPage((prevPage) => prevPage + 1);
  };
  // const {
  //   data: detail,
  //   isFetching: detailIsFetching,
  //   isLoading: detailIsLoading,
  // } = useDetailPost();
  const [items, setItems] = useState<any>([]);
  console.log(post);
  console.log(post?.data);
  console.log(post?.data?.length);
  console.log(post?.pagination?.total);
  console.log(items.length);
  console.log(items);
  useEffect(() => {
    if (post?.data) {
      setItems((prevItems: any) => [...prevItems, ...post.data]);
    }
  }, [post]);
  useEffect(() => {
    if (profile?.data?.isBanned == true) {
      toast.error("you have been banned cannnot create and comment a post", {
        position : "top-right"
      });
    }
  }, [profile]);
  return (
    <>
      <Toaster />
      <div className="w-screen h-screen flex flex-col justify-start items-center px-6 ">
        <Box sx={{ width: "100%" }}>
          {/* <InfiniteScroll
            loader={<CircularProgress />}
            dataLength={items.length}
            next={fetchMorePosts}
            hasMore={true}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          > */}
          <Masonry columns={{ xs: 2, sm: 3, md: 6 }} spacing={2}>
            {items?.map((item: any, index: any) => {
              return (
                <Link
                  key={item.id}
                  href={session?.user?.id ? `/user/post/detail/${item.id}` : ""}
                >
                  <div
                    className="bg-white"
                    // onClick={() => {
                    //   // (document as any)?.getElementById("my_modal_3").showModal();
                    //   // router.push(`/user/post/detail/${item.id}`)
                    // }}
                  >
                    <img
                      // className={`h-${item}`}
                      srcSet={`${item.images[0].url}`}
                      src={`${item.images[0].url}`}
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
                        {item.konten}
                      </p>
                      <div className="flex flex-row items-center gap-1.5">
                        <div>
                          <img
                            className="w-6 rounded-full"
                            src={
                              item.created_by.avatar
                                ? item.created_by.avatar
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                            }
                            alt={item.title}
                          />
                        </div>
                        <p className="line-clamp-1  text-gray-600 text-sm">
                          {item.created_by.nama}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Masonry>
          {/* </InfiniteScroll> */}
        </Box>
        <LoadMore
          page={params.page}
          setParams={setParams}
          setFilterParams={setFilterParams}
          total={post?.pagination?.total}
          totalPage={post?.pagination?.total_page}
          i={items.length}
        />
      </div>
      ;
    </>
  );
};

export default Page;
