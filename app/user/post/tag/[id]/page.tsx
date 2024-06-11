"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { Box, CircularProgress, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadMore from "@/components/loadMore";
import useAppModule from "@/app/user/lib";
import usePostModule from "../../lib";
import { Pagination } from "@/components/pagination";
const Page = ({ params }: { params: { id: string } }) => {
  //   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  console.log(session);
  const { usePostList } = useAppModule();
  const { useDetailTag } = usePostModule();
  const router = useRouter();
  const {
    data: tag,
    isFetching: tagIsFetching,
    isLoading: tagIsloading,
  } = useDetailTag(params.id);
  // const {
  //   data: detail,
  //   isFetching: detailIsFetching,
  //   isLoading: detailIsLoading,
  // } = useDetailPost();

  const {
    data: post,
    isFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params: postParams,
    setParams,
    setFilterParams,
    handleTagFilter,
  } = usePostList();

  const [items, setItems] = useState<any>([]);
  console.log(tag);
  console.log(post?.data);
  console.log(post?.data?.length);
  console.log(post?.pagination?.total);
  console.log(items.length);
  console.log(items);

  useEffect(() => {
    handleTagFilter(params.id);
    if (post?.data) {
      setItems((prevItems: any) => [...prevItems, ...post.data]);
    }
  }, [post]);

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen flex flex-col justify-start items-center px-6 ">
        <div className="mb-6 w-full flex gap-0.5 items-center justify-center">
          <img
            className="w-24 rounded-full"
            src="https://t4.ftcdn.net/jpg/00/78/52/25/360_F_78522501_H98sKqX3zmrJ9UZo3nGyjT3cA25DIgXP.jpg"
            alt="tag"
          />
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-semibold">{tag?.name}</p>
          </div>
        </div>
        <Box sx={{ width: "100%" }}>
          <Masonry columns={{ xs: 2, sm: 3, md: 6 }} spacing={2}>
            {post?.data?.length != 0 ? (
              post?.data?.map((item: any, index: any) => {
                return (
                  <Link
                    key={item.id}
                    href={
                      session?.user?.id ? `/user/post/detail/${item.id}` : ""
                    }
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
              })
            ) : (
              <div className="w-full flex justify-center items-center">
                <p>Tidak ada hasil</p>
              </div>
            )}
          </Masonry>
          {/* </InfiniteScroll> */}
        </Box>
        <Pagination
          page={postParams.page}
          pageSize={postParams.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={post?.pagination}
        />
      </div>
      ;
    </>
  );
};

export default Page;
