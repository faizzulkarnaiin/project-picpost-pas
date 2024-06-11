"use client";
import React, { ReactNode } from "react";
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
import { Button, IconButton, Tooltip } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import useAuthModule from "../auth/lib";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
const layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
console.log(session)
console.log(status)
  const menus = [
    {
      label: <AccountCircleIcon />,
      route: "",
      title: "userpage",
    },

    {
      label: <NotInterestedIcon />,
      route: "post",
      title: "post",
    },
  ];

  return (
    <div>

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
                      pathname === `/admin/${e.route}` ||
                      (pathname === "/admin" && e.route === "");
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
                              router.push(`/admin/${e.route}`);
                            } else {
                              toast.error("Anda Harus Login Terlebih dahulu");
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
