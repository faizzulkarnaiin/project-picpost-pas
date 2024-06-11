"use client";
import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { error } from "console";
import { AxiosClient } from "@/app/lib/axiosClient";
import useAxiosAuth from "@/app/hook/useAxiosAuth";
import useUploadFile from "@/app/hook/useUploadFile";
import toast from "react-hot-toast";
import { usePagination } from "@/app/hook/usePagination";
const useAdminModule = () => {
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();
  const router = useRouter();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const banPost = async (id: any) => {
    const banPay = {
      isBanned: true,
    };
    return AxiosClient.put(`post/ban/${id}`, banPay).then((res) => res.data);
  };

  const useBanPost = () => {
    const { mutate, isLoading } = useMutation(
      (id: string) => banPost(id),

      {
        onSuccess: (res) => {
          toast.success("Post have been banned");
          console.log(res);
          queryClient.invalidateQueries([`/post/listAll`]);
          queryClient.invalidateQueries([`/post/list`]);

          //   router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error("Ada Kesalahan");
        },
      }
    );
    return { mutate, isLoading };
  };
  const unBanPost = async (id: any) => {
    const banPay = {
      isBanned: false,
    };
    return AxiosClient.put(`post/unBan/${id}`, banPay).then((res) => res.data);
  };

  const useUnBanPost = () => {
    const { mutate, isLoading } = useMutation(
      (id: string) => unBanPost(id),

      {
        onSuccess: (res) => {
          toast.success("Post have been unbanned");
          console.log(res);
          queryClient.invalidateQueries([`/post/listAll`]);
          queryClient.invalidateQueries([`/post/list`]);
          queryClient.invalidateQueries([`/report/list`]);
          //   router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error("Ada Kesalahan");
        },
      }
    );
    return { mutate, isLoading };
  };
  const banUser = async (id: any) => {
    const banPay = {
      isBanned: true,
    };
    return AxiosClient.put(`auth/ban/${id}`, banPay).then((res) => res.data);
  };

  const useBanUser = () => {
    const { mutate, isLoading } = useMutation(
      (id: string) => banUser(id),

      {
        onSuccess: (res) => {
          toast.success("User have been banned");
          console.log(res);
          queryClient.invalidateQueries(["/auth/list"]);
          queryClient.invalidateQueries([`/report/list`]);
          //   router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error("Ada Kesalahan");
        },
      }
    );
    return { mutate, isLoading };
  };
  const unBanUser = async (id: any) => {
    const banPay = {
      isBanned: false,
    };
    return AxiosClient.put(`auth/unBan/${id}`, banPay).then((res) => res.data);
  };

  const useUnBanUser = () => {
    const { mutate, isLoading } = useMutation(
      (id: string) => unBanUser(id),

      {
        onSuccess: (res) => {
          toast.success("User have been unbanned");
          console.log(res);
          queryClient.invalidateQueries(["/auth/list"]);
          queryClient.invalidateQueries([`/report/list`]);
          //   router.push("/auth/login");
        },
        onError: (err: any) => {
          toast.error("Ada Kesalahan");
        },
      }
    );
    return { mutate, isLoading };
  };

  const getProfile = async () => {
    return axiosAuthClient.get("/auth/profile").then((res) => res.data);
  };
  const defaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 20,
    tagId: null,
    keyword: "",
  };
  const reportDefaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 20,
    // tagId: null,
    keyword: "",
  };

  const getPost = async (params: any) => {
    return AxiosClient.get("/post/listAll", { params }).then((res) => res.data);
  };
  const usePostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
      setFilterParams,
      handleTagFilter,
      handleSearch,
      handleKeyword,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/post/listAll", [filterParams]],
      () => getPost(filterParams),
      {
        select: (response: any) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );
    return {
      data,
      isFetching,
      isLoading,
      isError,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handleFilter,
      handleClear,
      setFilterParams,
      handleTagFilter,
      handleSearch,
      handleKeyword,
    };
  };
  const getReportPost = async (params: any) => {
    return AxiosClient.get("/report/list", { params }).then((res) => res.data);
  };
  const useReportPostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
      setFilterParams,
      handleTagFilter,
      handleSearch,
      handleKeyword,
    } = usePagination(reportDefaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/report/list", [filterParams]],
      () => getReportPost(filterParams),
      {
        select: (response: any) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );
    return {
      data,
      isFetching,
      isLoading,
      isError,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handleFilter,
      handleClear,
      setFilterParams,
      handleTagFilter,
      handleSearch,
      handleKeyword,
    };
  };
  const useDeletePost = () => {
    const { mutate, isLoading } = useMutation(
      (id: any) => {
        return AxiosClient.delete(`/post/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message);
          queryClient.invalidateQueries([`/post/list`]);
          queryClient.invalidateQueries([`/post/listAll`]);
          queryClient.invalidateQueries([`/report/list`]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("ada kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };
  const useDeleteReport = () => {
    const { mutate, isLoading } = useMutation(
      (id: any) => {
        return AxiosClient.delete(`/report/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message);
          queryClient.invalidateQueries([`/post/list`]);
          queryClient.invalidateQueries([`/post/listAll`]);
          queryClient.invalidateQueries([`/report/list`]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("ada kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };
  const useDeleteUser = () => {
    const { mutate, isLoading } = useMutation(
      (id: any) => {
        return AxiosClient.delete(`/auth/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message);
          queryClient.invalidateQueries([`/user/list`]);
          queryClient.invalidateQueries([`/post/listAll`]);
          queryClient.invalidateQueries([`/report/list`]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("ada kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  return {
    useBanPost,
    usePostList,
    useDeletePost,
    useUnBanPost,
    useBanUser,
    useUnBanUser,
    useDeleteUser,
    useReportPostList,
    useDeleteReport,
  };
};
export default useAdminModule;
