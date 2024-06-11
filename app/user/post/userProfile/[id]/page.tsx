"use client";
import useAuthModule from "@/app/auth/lib";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAppModule from "@/app/user/lib";
import { useSession } from "next-auth/react";
import usePostModule from "../../lib";

const page = ({ params }: { params: { id: string } }) => {
  const { getUserProfile } = useAuthModule();
  const { data: profile, isFetching } = getUserProfile(params.id);
  const { usePostByUserIdList, useFollowingListById, useFollowersListById } =
    useAppModule();
  const { data: session, status } = useSession();
  const { useDeleteFollow, useCreateFollow } = usePostModule();
  const { mutate: FollowMutate, isLoading: isLoadingCreateFollow } =
    useCreateFollow(params.id);
  const { mutate: followDeleteMutate, isLoading: isLoadingDeleteFollow } =
    useDeleteFollow(params.id);
  const {
    data: post,
    isFetching: listIsFething,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params: userParams,
    setParams,
  } = usePostByUserIdList(params.id);
  const {
    data: followers,
    isFetching: fllistIsFething,
    isLoading: flLoading,
    handleClear: flhandleClear,
    handleFilter: flhandleFilter,
    handlePage: flhandlePage,
    handlePageSize: flhandlePageSize,
    params: flparams,
    setParams: flsetParams,
  } = useFollowersListById(params.id);
  const {
    data: following,
    isFetching: fllistIsFethingfollowing,
    isLoading: flLoadingfollowing,
    handleClear: flhandleClearfollowing,
    handleFilter: flhandleFilterfollowing,
    handlePage: flhandlePagefollowing,
    handlePageSize: flhandlePageSizefollowing,
    params: flparamsfollowing,
    setParams: followingflsetParams,
  } = useFollowingListById(params.id);
  // const userSfollow = followers?.data?.find(
  //   (follow) => follow.follow,
  // );
  const followerData = followers?.data?.find(
    (item: any) => item.follower.id === session?.user.id
  );
  // const followerIds = followerData.map((item: any) => item.id);
  const followess = followerData && followerData.id;
  const followersId = followerData ? followerData.id : null;
  // console.log(followerIds);
  console.log(followess);
  console.log(followersId);
  console.log(followers, "fl");
  console.log(following, "flng");
  const router = useRouter();
  console.log(profile);
  console.log(post, "post");
  console.log(params.id);
  // const [isFollowing, setIsFollowing] = useState();

  // useEffect(() => {
  //   if (following?.data?.some((f: any) => f.followed.id === session?.user.id)) {
  //     setIsFollowing(true);
  //   } else {
  //     setIsFollowing(false);
  //   }
  //   console.log(isFollowing);
  // }, [following, params.id]);
  return (
    <div>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-[400px] flex flex-col items-center ">
          <h3 className="font-bold text-lg text-teal-900">Following</h3>
          <div className="grid grid-cols-1 gap-4 items-center mt-6 justify-center">
            {following?.data?.map((e: any, i: any) => (
              <div className="flex gap-3 items-center">
                <img
                  src={
                    e.followed.avatar
                      ? e.followed.avatar
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                  }
                  alt="user_profile"
                  className="w-8 rounded-full"
                />
                <p key={i}>{e.followed.nama}</p>
              </div>
            ))}
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              {/* if there is a button, it will close the modal */}
              <button className="btn bg-teal-900 text-white w-full max-h-[20px]">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="followers" className="modal">
        <div className="modal-box flex flex-col gap-4 items-center w-[400px]">
          <h3 className="font-bold text-lg text-teal-900">Followers</h3>
          <div className="grid grid-cols-1 items-center gap-4">
            {followers?.data?.length !== 0 &&
              followers?.data?.map((e: any, i: any) => (
                <div className="flex gap-3 items-center">
                  <img
                    src={
                      e.follower.avatar
                        ? e.follower.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                    }
                    alt="user_profile"
                    className="w-8 rounded-full"
                  />
                  <p key={i}>{e.follower.nama}</p>
                </div>
              ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              {/* {followers?.data?.map((e : any, i : any) => (

              ))} */}
              <div
                className="cursor-pointer"
                onClick={() =>
                  (document.getElementById as any)("followers").showModal()
                }
              >
                <p className="font-bold text-teal-900 text-xl">
                  {followers?.data?.length === 0 && <p>0</p>}
                  {followers?.data?.length !== 0 ? (
                    followers?.data[0]?.followerCount
                  ) : (
                    <p>0</p>
                  )}
                </p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  (document.getElementById as any)("my_modal_5").showModal()
                }
              >
                <p className="font-bold text-teal-900 text-xl">
                  {following?.data.length !== 0 ? (
                    following?.data[0]?.followedCount
                  ) : (
                    <p>0</p>
                  )}
                </p>
                <p className="text-gray-400">Following</p>
              </div>
              <div>
                <p className="font-bold text-teal-900 text-xl">
                  {post?.data?.length}
                </p>
                <p className="text-gray-400">Post</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="rounded-full"
                  src={
                    profile?.data?.avatar
                      ? profile?.data?.avatar
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              {followers?.data?.find(
                (f: any) => f.follower.id === session?.user.id
              ) ? (
                <button
                  onClick={() => followDeleteMutate(followersId)}
                  className="text-white py-2 px-4 uppercase rounded bg-teal-900 hover:bg-teal-950 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  unfollow
                </button>
              ) : (
                <button
                  onClick={() => FollowMutate(params.id)}
                  className="text-white py-2 px-4 uppercase rounded bg-teal-900 hover:bg-teal-950 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  follow
                </button>
              )}
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-teal-900">
              {profile?.data?.nama}
              {/* <span className="font-light text-gray-500">27</span> */}
            </h1>
            {/* <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p> */}
            <p className="mt-8 text-gray-500">
              {profile?.data?.bio !== null
                ? profile?.data?.bio
                : "Belum ada bio"}
            </p>
            <p className="mt-2 text-gray-500"></p>
          </div>
          <div className="w-full flex items-center justify-center text-teal-900 mt-4">
            <h4 className="text-2xl font-semibold">Created</h4>
          </div>
          <div className="grid lg:grid-cols-6 grid-cols-2 gap-4 mt-6">
            {post?.data?.map((item: any, e: any) => (
              <Link href={`/user/post/detail/${item.id}`} key={e}>
                <div
                  // onClick={() => router.push(`/user/post/detail/${item.id}`)}
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
