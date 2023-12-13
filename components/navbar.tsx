"use client";
import Link from "next/link";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { signOut, useSession } from "next-auth/react";
interface NavbarProps {
  searchINput: boolean;
  cart?: boolean;
  profile?: boolean;
}
export default function Navbar() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      <div className="navbar w-full bg-teal-900 text-white rounded-lg px-4 mt-2 h-[50px] md:h-[80px]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-black bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-2xl">Gromouse</a>
        </div>
        <div className="navbar-center lg:flex hidden">
          <form action="">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here"
                className="input h-[40px] rounded-full w-[400px] text-slate-600"
              />
              <div
                className="absolute inset-y-0 right-3 text-gray-400 pl-3  
                    flex items-center  
                    pointer-events-none"
              >
                <SearchIcon className="w-5 h-5" />
              </div>
            </div>
          </form>
        </div>
        <div className="navbar-end flex gap-4">
          <div className="dropdown dropdown-end text-slate-600">
            <label
              tabIndex={0}
              className="btn btn-ghost h-5 w-12 btn-circle bg-white"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-900  rounded-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-orange-400">
                  8
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-neutral btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end text-slate-600">
            {session ? (
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="data:image/jpeg;base64,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" />
                </div>
              </label>
            ) : (
              <Link href={"shop/login"}>
                <button className="btn">login</button>
              </Link>
            )}
            {session && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="mx-2">
        <nav
          className={`${
            searchINput
              ? " w-full h-[80px] flex justify-around items-center gap-3  rounded-md mt-3"
              : "w-full h-[80px] flex justify-between items-center gap-3  rounded-md mt-3"
          }`}
        >
          <div className="flex gap-8 items-center">
            <ul
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className={`absolute left-16 top-10 w-60 py-3  rounded-lg mt-2 shadow-xl transition duration-500 opacity-0 hover:opacity-100 cursor-pointer  bg-white ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <Link href={"/main"}>
                <li className="flex w-full items-center px-3 py-2 text-sm transform transition duration-500 hover:scale-95 hover:bg-slate-100">
                  Home
                </li>
              </Link>
              <Link href={"main/shop"}>
                <li className="flex w-full items-center px-3 py-2 text-sm transform transition duration-500 hover:scale-95 hover:bg-slate-100">
                  Shop
                </li>
              </Link>

              <li className="flex w-full items-center px-3 py-2 text-sm transform transition duration-500 hover:scale-95 hover:bg-slate-100">
                Dropdown List 3
              </li>
            </ul>
            <div
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className=" w-6 h-6 stroke-current hidden lg:inline-block cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            <Link href={"/main"}>
              <h2 className="md:text-2xl text-lg">YourWebsite</h2>
            </Link>
            {/* <ul className="flex gap-9 items-baseline justify-center cursor-pointer text-slate-200 font-light">
                <li>Home</li>
                <li>Shop</li>
                <li>About us</li>
                <li>Contact</li>
              </ul> */
}
// </div>
// {searchINput && (
//       <div className="max-w-md mx-auto shadow-md rounded-md bg-white w-[500px] ">
//         <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white  overflow-hidden">
//           <div className="grid place-items-center h-full w-12 text-gray-300">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>

//           <input
//             className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-white"
//             type="text"
//             id="search"
//             placeholder="Search something.."
//           />
//         </div>
//       </div>
//     )}

//     <div className="drawer-end md:hidden flex">
//       <div className="drawer drawer-end  flex md:hidden"></div>
//       <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content">
//         {/* Page content here */}
//         <label htmlFor="my-drawer-4" className="drawer-button ">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             className="inline-block w-5 h-5 stroke-current"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </label>
//       </div>
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer-4"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//           {/* Sidebar content here */}
//           <li>
//             <a>Sidebar Item 1</a>
//           </li>
//           <li>
//             <a>Sidebar Item 2</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div className="lg:flex gap-6 hidden">
//       <ul className="flex gap-6 items-baseline">
//         <li className="btn  transition-colors duration-300 ease-in-out text-slate-100 z-10">
//           signup
//         </li>
//         <li>s</li>
//       </ul>
//       <div className=" flex items-center">
//         <span className="bg-white w-9 h-9 rounded-full"></span>
//       </div>
//     </div>
//   </nav>
// </div> */}
