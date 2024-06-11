"use client";
import React, { ReactNode, useEffect, useState } from "react";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tooltip,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import useAuthModule from "../auth/lib";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import usePostModule from "./post/lib";
import Link from "next/link";
import LoadMore from "@/components/loadMore";
const layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { useTagList } = usePostModule();
  const { data: session, status } = useSession();
  const { useProfile, useUserList } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const {
    data: user,
    isFetching: userIsFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    handleSearch,
    setParams,
    handleKeyword,
  } = useUserList();
  const {
    data: tag,
    isFetching: tagIsFetching,
    isLoading: tagIsloading,
    handleClear: taghandleClear,
    handleFilter: tagHandleFilter,
    params: tagParams,
    handleSearch: tagHandleSearch,
    setParams: tagSetParams,
    handleKeyword: tagHandleKeyword,
    setFilterParams: tagSetFilterParams,
  } = useTagList();
  let [value, setValue] = useState("1");
  let [tagItems, setTagItems] = useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  console.log(profile);
  console.log(session);
  console.log(session?.user.isBanned);
  console.log(status);
  useEffect(() => {
    if (tag?.data) {
      setTagItems((prev: any) => [...prev, ...tag.data]);
    }
  }, [tag]);
  const menus = [
    {
      label: <HomeRoundedIcon />,
      route: "",
      title: "homepage",
    },

    {
      label: <FavoriteBorderRoundedIcon />,
      route: "like",
      title: "liked page",
    },
    {
      label: <BookmarkBorderRoundedIcon />,
      route: "savePost",
      title: "saved post page",
    },
    {
      label: <AddCircleOutlineRoundedIcon />,
      route: "create",
      title: "create post page",
    },
  ];

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-2/3 max-w-5xl h-[400px]">
          <div className="w-full flex flex-col items-center">
            <Box sx={{ width: "100%", typography: "body2" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    TabIndicatorProps={{ style: { backgroundColor: "teal" } }}
                  >
                    <Tab
                      label="User"
                      value="1"
                      sx={{ "&.Mui-selected": { color: "teal" } }}
                    />
                    <Tab
                      label="Tag"
                      value="2"
                      sx={{ "&.Mui-selected": { color: "teal" } }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="flex w-full h-full flex-col gap-2 items-center px-4">
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      onSubmit={() => handleKeyword(params.keyword)}
                      onChange={(e) => {
                        handleSearch(e);
                        // handleKeyword(params.keyword);
                        console.log(e.target.value);
                      }}
                    />
                    {/* <button className="btn" onClick={() => handleKeyword(params.keyword)}>enter</button> */}
                  </div>
                  <div className="mt-2">
                    {user?.data?.length !== 0 ? (
                      user?.data?.map((i: any, e: any) => (
                        <div
                          className="cursor-pointer"
                          key={e}
                          onClick={() => {
                            if (profile?.data?.id === i.id) {
                              router.push("/user/post/profile");
                            } else {
                              router.push(`/user/post/userProfile/${i.id}`);
                            }

                            (document as any)
                              .getElementById("my_modal_4")
                              .close();
                          }}
                        >
                          <List sx={{ width: "100%", maxWidth: 360 }}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <img
                                    src={
                                      i.avatar
                                        ? i.avatar
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                                    }
                                    alt="user_prof"
                                  />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={i.nama}
                                secondary={i.nama_lengkap}
                              />
                            </ListItem>
                          </List>
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center mt-4">
                        <p>Tidak ada hasil</p>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="flex w-full h-full flex-col gap-2 items-center px-4">
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full"
                      onSubmit={() => tagHandleKeyword(params.keyword)}
                      onChange={(e) => {
                        tagHandleSearch(e);
                        // handleKeyword(params.keyword);
                        console.log(e.target.value);
                      }}
                    />
                    {/* <button className="btn" onClick={() => handleKeyword(params.keyword)}>enter</button> */}
                  </div>
                  <div className="mt-2">
                    {tagItems.length !== 0 ? (
                      tagItems.map((i: any, e: any) => (
                        <Link href={`/user/post/tag/${i.id}`} key={e}>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              (document as any)
                                .getElementById("my_modal_4")
                                .close();
                            }}
                          >
                            <List sx={{ width: "100%", maxWidth: 360 }}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <img
                                      src="https://t4.ftcdn.net/jpg/00/78/52/25/360_F_78522501_H98sKqX3zmrJ9UZo3nGyjT3cA25DIgXP.jpg"
                                      alt="hastag"
                                    />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={i.name}
                                  // secondary={i.nama_lengkap}
                                />
                              </ListItem>
                            </List>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center mt-4">
                        <p>Tidak ada hasil</p>
                      </div>
                    )}
                    <LoadMore
                      page={tagParams.page}
                      setParams={tagSetParams}
                      setFilterParams={tagSetFilterParams}
                      total={tag?.pagination?.total}
                      totalPage={tag?.pagination?.total_page}
                      i={tagItems.length}
                    />
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Toaster />
      <div className="navbar bg-white shadow-sm px-6 mt-2 mb-4 sticky top-0 z-10">
        <div className="navbar-start">
          <div className="drawer z-40">
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle z-40"
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button">
                <MenuTwoToneIcon />
              </label>
            </div>
            <div className="drawer-side z-40">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-28 lg:w-28 min-h-full bg-teal-900 transition-all text-slate-100 flex flex-col items-center gap-6 pt-8 justify-between z-40">
                <div className="flex flex-col gap-6 items-center">
                  {menus.map((e, i) => {
                    const isActive =
                      pathname === `/user/post/${e.route}` ||
                      (pathname === "/user/post" && e.route === "");
                    return (
                      <li
                        key={i}
                        className={clsx(``, {
                          "": !isActive,
                          "btn-active btn": isActive,
                        })}
                      >
                        <a
                          onClick={() => {
                            if (session) {
                              router.push(`/user/post/${e.route}`);
                            } else {
                              {
                                toast.error("Anda Harus Login Terlebih dahulu");
                              }
                            }
                          }}
                        >
                          <Tooltip title={e.title}>
                            {/* <IconButton color="primary" className="text-white"> */}
                            {e.label}
                            {/* </IconButton> */}
                          </Tooltip>
                        </a>
                      </li>
                    );
                  })}
                  <li>
                    <a
                      onClick={() =>
                        (document as any)
                          .getElementById("my_modal_4")
                          .showModal()
                      }
                    >
                      <SearchRoundedIcon />
                    </a>
                  </li>
                </div>
                <div>
                  <li>
                    <a onClick={() => signOut()}>
                      <LogoutRoundedIcon fontSize="medium" />
                    </a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-3xl text-teal-900 font-bold">
            PicPost!
          </a>
        </div>
        <div className="navbar-end">
          {session && status === "authenticated" ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user profile"
                    src={
                      profile?.data?.avatar
                        ? profile?.data?.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li onClick={() => router.push("/user/post/profile")}>
                  <a className="justify-between">your profile ..</a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn bg-teal-900 text-white"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <div className="">
        {children} {modal}
      </div>
    </div>
  );
};

export default layout;
