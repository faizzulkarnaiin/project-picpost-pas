"use client";
import useAuthModule from "@/app/auth/lib";
import { useRouter } from "next/navigation";
import React from "react";
import useAppModule from "../../lib";
import Link from "next/link";
import toast from "react-hot-toast";

const page = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { usePostByUserLoginList, useFollowersList, useFollowingList } =
    useAppModule();
  const {
    data: post,
    isFetching: listIsFething,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
  } = usePostByUserLoginList();
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
  } = useFollowersList();
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
  } = useFollowingList();
  console.log(followers, "fl");
  console.log(following, "flng");
  const router = useRouter();
  console.log(profile);
  console.log(post, "post");

  return (
    <div>
      <dialog id="following" className="modal">
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
        <div className="modal-box flex flex-col gap-2 items-center w-[400px]">
          <h3 className="font-bold text-lg text-teal-900">Followers</h3>
          <div className="grid grid-cols-1 items-center gap-2">
            {followers?.data?.map((e: any, i: any) => (
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
                  {followers?.data[0]?.followerCount ? followers?.data[0]?.followerCount : 0}
                </p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  (document.getElementById as any)("following").showModal()
                }
              >
                <p className="font-bold text-teal-900 text-xl">
                  {following?.data[0]?.followedCount}
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
                  alt="user_profile"
                />
              </div>
            </div>
            <div className="space-x-8 flex  mt-32 md:mt-0 justify-center">
              {/* <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                
                Connect
              </button> */}
              <button
                onClick={() => router.push(`/user/update/${profile?.data?.id}`)}
                className="text-white py-2 px-4 uppercase rounded bg-teal-900 hover:bg-teal-950 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                edit profile
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-teal-900">
              {profile?.data?.nama}
              {/* <span className="font-light text-gray-500">27</span> */}
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {profile?.data?.nama_lengkap !== null
                ? profile?.data?.nama_lengkap
                : ""}
            </p>
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
              // <Link href={ item.isBanned === false && `/user/post/detail/${item.id}`} key={e}>
              <div
                className="bg-white cursor-pointer"
                onClick={() => {
                  if (item.isBanned === false) {
                    router.push(`/user/post/detail/${item.id}`);
                  } else {
                    toast.error("post have been banned cannot edit or see it");
                  }
                }}
              >
                <img
                  srcSet={
                    item.isBanned === false
                      ? item.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3LiA10c9x1NGvPH7ftsPL5SpjVIlLLyxSsms6hwy_Nv87C-O7ELXqiQrkEVwfovKiLU&usqp=CAU"
                  }
                  src={
                    item.isBanned === false
                      ? item.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3LiA10c9x1NGvPH7ftsPL5SpjVIlLLyxSsms6hwy_Nv87C-O7ELXqiQrkEVwfovKiLU&usqp=CAU"
                  }
                  alt={item.judul}
                  loading="lazy"
                  style={{
                    borderRadius: 10,
                    display: "block",
                    width: "100%",
                  }}
                />

                <div className="flex flex-col gap-2 justify-start ">
                  <p className="text-black/80 font-medium line-clamp-1 text-sm pt-3">
                    {item.isBanned === false
                      ? item.konten
                      : "Your Post Have been Banned"}
                  </p>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
