"use client"
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
const Loading = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status == "loading") {
    return <div className="bg-blend-color-burn flex items-center justify-center w-screen h-screen"><CircularProgress  className="text-teal-900"/></div>;
  }
  return <div>{children}</div>;
};

export default Loading;
