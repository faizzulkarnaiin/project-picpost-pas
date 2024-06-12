"use client";
import useAppModule from "@/app/user/lib";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Link from "next/link";
import { useSession } from "next-auth/react";
import usePostModule from "../../lib";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useConfirmDelete } from "@/app/hook/useConfirmDelete";
import DeleteIcon from "@mui/icons-material/Delete";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import useAuthModule from "@/app/auth/lib";
import LoadMore from "@/components/loadMore";
import MenuPopupState from "@/components/Report";
import DetailMenuPopupState from "@/components/DetailOptions";

// import "bootstrap/dist/css/bootstrap.min.css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css/navigation";
// import "swiper/css";
// import "swiper/css/pagination";
const CreateCommentSchema = yup.object().shape({
  isi_komentar: yup.string().required("Isi Kolom Komentar").min(1).max(500),
});
const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching: isF } = useProfile();
  console.log(profile, "prof");
  console.log(profile?.data?.isBanned, "prof");
  const { data: session, status } = useSession();
  const { useDetailPost, usePostList } = useAppModule();
  const { data: detail, isFetching } = useDetailPost(params.id);
  const {
    useCommentList,
    useCreateComment,
    useCreateLike,
    useCreateSave,
    useDeleteLike,
    useDeleteSave,
    useDeletePost,
    useDeleteFollow,
    useCreateFollow,
    useCreateReport,
  } = usePostModule();
  const { mutate, isLoading: isLoadingCreateComment } = useCreateComment(
    params.id
  );
  const { mutate: createReportMutate, isLoading: isLoadingCreateReport } =
    useCreateReport(params.id);
  const { mutate: FollowMutate, isLoading: isLoadingCreateFollow } =
    useCreateFollow(params.id);
  const { mutate: likeMutate, isLoading: isLoadingCreateLike } = useCreateLike(
    params.id
  );
  const { mutate: saveMutate, isLoading: isLoadingCreatesave } = useCreateSave(
    params.id
  );
  const { mutate: saveDeleteMutate, isLoading: isLoadingCreateSaveDelete } =
    useDeleteSave(params.id);
  const { mutate: likeDeleteMutate, isLoading: isLoadingCreateLikeDelete } =
    useDeleteLike(params.id);
  const { mutate: postDeleteMutate, isLoading: isLoadingDeletePost } =
    useDeletePost(params.id);
  const { mutate: followDeleteMutate, isLoading: isLoadingDeleteFollow } =
    useDeleteFollow(params.id);
  const {
    data: post,
    isFetching: postIsFethcing,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params: paramss,
    setFilterParams,
    setParams,
  } = usePostList();
  const handleDeleteSave = useConfirmDelete({
    onSubmit: (id: any) => {
      saveDeleteMutate(id);
    },
  });
  const handleDeleteLike = useConfirmDelete({
    onSubmit: (id: any) => {
      likeDeleteMutate(id);
    },
  });
  const handleDeletePost = useConfirmDelete({
    onSubmit: (id: any) => {
      postDeleteMutate(id);
    },
  });
  const handleDeleteFollow = useConfirmDelete({
    onSubmit: (id: any, user_id: any) => {
      followDeleteMutate(id, user_id);
    },
  });

  const {
    data: comment,
    isFetching: CommentIsFethcing,
    isLoading: commentIsLoading,
    handleClear: commentHandleClear,
    handleFilter: com,
    handlePage: commentHandlePage,
    handlePageSize: commentHandlePageSize,
    params: paramsCom,
    setParams: comSetP,
  } = useCommentList(params.id);

  console.log(detail, "detail");
  console.log(comment);
  const formik = useFormik<any>({
    initialValues: {
      isi_komentar: "",
    },
    validationSchema: CreateCommentSchema,
    onSubmit: async (values: any) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues({
            isi_komentar: "",
          });
        },
      });
    },
  });
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    touched,
    resetForm,
    setValues,
  } = formik;
  const [items, setItems] = useState<any>([]);

  console.log(items);
  useEffect(() => {
    if (post?.data) {
      setItems((prevItems: any) => [...prevItems, ...post.data]);
    }
  }, [post]);
  return (
    <div className="w-screen h-screen px-12 pt-4">
      <Toaster />
      <div
        className={`rounded-xl shadow-xl w-full h-auto lg:max-h-[400px] flex justify-between flex-col lg:flex-row `}
      >
        {/* detail? Image */}
        <div
          className="h-full rounded-box w-full lg:w-1/3 "
          // style={{ height: maxImageHeight ? maxImageHeight : "100%" }}
        >
          <div className="w-full max-h-[380px] carousel rounded-box relative">
            {detail?.images?.map((image: any, index: any) => (
              <div
                key={index}
                className={`carousel-item w-full flex justify-center items-center`}
              >
                <img
                  src={image.url}
                  className="w-full object-contain"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* detail? Details */}
        <div className="lg:w-2/3 w-full h-full flex flex-col gap-5 p-8 justify-between">
          <div
            className="flex flex-col gap-1.5  max-h-64 overflow-y-auto"
            id="scroll"
          >
            <div className="w-full flex justify-between items-center mb-2 px-2">
              {/* {detail?.tags.length !== 0 ? (
              detail?.tags.map((e: any, i: any) => (
                <p className="text-gray-700 font-thin mt-2" key={i}>
                  {e.name}
                </p>
              ))
            ) : (
              <p>.</p>
            )} */}

              <div className="">
                {detail?.isSavedByUser === false ? (
                  <div
                    className="py-3 px-5 rounded-3xl bg-teal-900 text-white cursor-pointer"
                    onClick={() => saveMutate(params.id)}
                  >
                    {isLoadingCreatesave && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Save
                  </div>
                ) : (
                  <div
                    className="py-3 px-5 rounded-3xl bg-teal-900 text text-white cursor-pointer"
                    onClick={() => saveDeleteMutate(detail?.userSaveId)}
                  >
                    unsave
                    {isLoadingCreateSaveDelete && (
                      <span className="loading loading-spinner"></span>
                    )}
                  </div>
                )}
              </div> *

             
              <div className="">
                <DetailMenuPopupState
                  isLoadingCreateSaveDelete={isLoadingCreateSaveDelete}
                  isLoadingCreatesave={isLoadingCreatesave}
                  deleteMutate={postDeleteMutate}
                  detail={detail}
                  session={session}
                  reportMutate={createReportMutate}
                  saveDeleteMutate={saveDeleteMutate}
                  saveMutate={saveMutate}
                ></DetailMenuPopupState>
              </div>
            </div>

            <h2 className="text-3xl font-bold">{detail?.judul}</h2>
            <p className=" mt-2">{detail?.konten}</p>
            <div className="flex justify-between w-auto items-baseline mt-10">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => {
                  detail?.created_by?.id === session?.user?.id
                    ? router.push("/user/post/profile")
                    : router.push(
                        `/user/post/userProfile/${detail?.created_by?.id}`
                      );
                }}
              >
                <div className="rounded-full w-12">
                  <img
                    className="rounded-full"
                    src={
                      detail?.created_by.avatar !== null
                        ? detail?.created_by.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                    }
                    alt="user profile"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-lg">{detail?.created_by.nama}</h3>
                  <p className="text-sm font-thin">follower</p>
                </div>
              </div>
              {detail?.created_by.id !== session?.user?.id &&
                (detail?.isFollowed ? (
                  <p
                    className="py-3 px-5 rounded-3xl text-teal-900 bg-slate-200 cursor-pointer"
                    onClick={() => followDeleteMutate(detail?.followingId)}
                  >
                    Unfollow
                  </p>
                ) : (
                  <p
                    className="py-3 px-5 rounded-3xl text-teal-900 bg-slate-200 cursor-pointer"
                    onClick={() => FollowMutate(detail?.created_by?.id)}
                  >
                    Follow
                  </p>
                ))}
            </div>
            <h2 className="mt-10">Comments</h2>
            <div className="flex flex-col gap-5 mt-6">
              {comment?.data?.length === 0 ? (
                <p>No Comments Yet</p>
              ) : (
                comment?.data?.map((e: any, i: any) => (
                  <div className="flex gap-2 items-center" key={i}>
                    <div
                      className=" "
                      onClick={() => {
                        detail?.created_by?.id === session?.user?.id
                          ? router.push("/user/post/profile")
                          : router.push(
                              `/user/post/userProfile/${detail?.created_by?.id}`
                            );
                      }}
                    >
                      <img
                        className="rounded-full w-8"
                        src={
                          e.created_by.avatar
                            ? e.created_by.avatar
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                        }
                        alt="user_profile"
                      />
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm">{e.created_by.nama}</p>
                      <p className="font-thin text-sm">{e.isi_komentar}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full h-full flex gap-4 items-center">
            <div className="">
              <img
                className="rounded-full w-10"
                src={
                  profile?.data?.avatar
                    ? profile?.data?.avatar
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                }
                alt="user_profile"
              />
            </div>

            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <section className="w-full lg:w-[800px]">
                  <input
                    onClick={() => {
                      if (profile?.data?.isBanned === true) {
                        toast.error("cannot make a comment");
                        console.log("ok");
                      }
                    }}
                    disabled={profile?.data?.isBanned}
                    onChange={handleChange}
                    id="isi_komentar"
                    name="isi_komentar"
                    value={values.isi_komentar}
                    type="text"
                    placeholder="Add Comment"
                    className="input input-bordered w-full"
                  />
                </section>
                {/* <FavoriteIcon/> */}
              </Form>
            </FormikProvider>
            {detail?.isLikedByUser === false ? (
              <div
                className=" text-teal-900 cursor-pointer"
                onClick={() => likeMutate(params.id as string)}
              >
                {isLoadingCreatesave && (
                  <span className="loading loading-spinner"></span>
                )}
                <FavoriteBorderIcon className="text-teal-900"></FavoriteBorderIcon>
              </div>
            ) : (
              <div
                className=""
                onClick={() => likeDeleteMutate(detail?.userLikeId)}
              >
                <FavoriteIcon className="text-teal-900"></FavoriteIcon>
                {isLoadingCreateSaveDelete && (
                  <span className="loading loading-spinner"></span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex w-full h-full items-center"><h4>More Post</h4></div> */}
      <div className="mt-8 w-full h-full">
        <div className="p-4">
          <h4 className="font-semibold text-teal-900 text-2xl ">More Post</h4>
        </div>
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
            {items.map((item: any, index: any) => {
              return (
                <Link key={item.id} href={`/user/post/detail/${item.id}`}>
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
                      <div className="flex flex-row gap-2 items-center">
                        <img
                          className="w-8 rounded-full"
                          src={
                            item.created_by.avatar
                              ? item.created_by.avatar
                              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                          }
                          alt={item.title}
                        />
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
          page={paramss.page}
          setParams={setParams}
          setFilterParams={setFilterParams}
          total={post?.pagination?.total}
          totalPage={post?.pagination?.total_page}
          i={items.length}
        />
      </div>
    </div>
  );
};

export default DetailPage;
