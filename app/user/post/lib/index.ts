// 'use server'
import useAxiosAuth from "@/app/hook/useAxiosAuth";
import { usePagination } from "@/app/hook/usePagination";
import { AxiosClient } from "@/app/lib/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const usePostModule = () => {
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const defaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 12,
    // tagId: null
  };
  const getPost = async (params: any) => {
    return AxiosClient.get("/post/list", { params }).then((res) => res.data);
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
      fetchMoreData,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/post/list", [filterParams]],
      () => getPost(filterParams),
      {
        select: (response: any) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        // enabled: !!session === true,
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
      setFilterParams,
      handleFilter,
      handleClear,
      fetchMoreData,
    };
  };
  const tagDefaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 12,
    keyword: "",
  };
  const getTag = async (params: any) => {
    return AxiosClient.get("/tag/list", { params }).then((res) => res.data);
  };
  const useTagList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
      setFilterParams,
      fetchMoreData,
      handleSearch,
      handleKeyword,
    } = usePagination(tagDefaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/tag/list", [filterParams]],
      () => getTag(filterParams),
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
      setFilterParams,
      handleFilter,
      handleClear,
      fetchMoreData,
      handleSearch,
      handleKeyword,
    };
  };
  const getDetailPost = async (id: string): Promise<any> => {
    return axiosAuthClient
      .get(`/post/detail/${id}`)
      .then((res) => res.data.data);
  };
  const getDetailTag = async (id: string): Promise<any> => {
    return axiosAuthClient
      .get(`/tag/detail/${id}`)
      .then((res) => res.data.data);
  };
  const getCommentByPostId = async (id: string): Promise<any> => {
    return axiosAuthClient.get(`/comment/list/${id}`).then((res) => res.data);
  };
  const CommentdefaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 30,
    // tagId: null
  };
  const useCommentList = (id: string) => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(CommentdefaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/comment/list", { id }, [filterParams]],
      () => getCommentByPostId(id),
      {
        select: (response) => response,
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
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    };
  };

  const useDetailPost = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/post/detail", { id }],
      () => getDetailPost(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };
  const useDetailTag = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/tag/detail", { id }],
      () => getDetailTag(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };
  const getLikedPost = async () => {
    return AxiosClient.get("/like/listById").then((res) => res.data);
  };
  const LikedefaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 30,
    // tagId: null
  };
  const useLikedPostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(LikedefaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/like/listById"],
      () => getLikedPost(),
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
    };
  };
  const getSavedPost = async () => {
    return AxiosClient.get("/save-post/listById").then((res) => res.data);
  };
  const SavedefaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 30,
    // tagId: null
  };
  const useSavedPostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(SavedefaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/save-post/listById"],
      () => getSavedPost(),
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
    };
  };
  const useUpdatePost = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: any) => {
        return AxiosClient.put(`/post/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message);
          queryClient.invalidateQueries(["/post/detail"]);
        },

        onError: (error: any) => {
          toast.error(error);
          console.log(error);
        },
      }
    );
    return { mutate, isLoading };
  };
  const useCreateComment = (id: any) => {
    const { mutate, isLoading } = useMutation(
      (payload: any) => {
        return axiosAuthClient.post(`/comment/create/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toast.success("comment created", {
            position: "top-right",
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/comment/list/${id}`]);
          queryClient.invalidateQueries([`/comment/list`]);
          queryClient.invalidateQueries([`/post/list`]);
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
        },
        onError: (error) => {
          toast.error("Tidak Berhasil Mengcreate Comment");
        },
      }
    );
    return { mutate, isLoading };
  };
  const useCreateLike = (id: any) => {
    const { mutate, isLoading } = useMutation(
      (payload: any) => {
        return axiosAuthClient.get(`/like/create/${id}`);
      },
      {
        onSuccess: (response) => {
          toast("Liked !", {
            icon: "💕",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
        },
        onError: (error) => {
          toast.error("Tidak Berhasil Mengcreate like");
        },
      }
    );
    return { mutate, isLoading };
  };
  const useCreateSave = (id: any) => {
    const { mutate, isLoading } = useMutation(
      (payload: any) => {
        return axiosAuthClient.get(`/save-post/create/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toast("Saved !", {
            icon: "🔖",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
        },
        onError: (error) => {
          toast.error("Tidak Berhasil Mengcreate save");
          console.log(error);
        },
      }
    );
    return { mutate, isLoading };
  };
  const useDeleteLike = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return AxiosClient.delete(`/like/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast("unliked !", {
            icon: "💔",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
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
  const useDeleteSave = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return AxiosClient.delete(`/save-post/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast("unsaved !", {
            icon: "❎",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
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
  const useDeletePost = (id: any) => {
    const { mutate, isLoading } = useMutation(
      (id: any) => {
        return AxiosClient.delete(`/post/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast.success("deleted");
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
          queryClient.invalidateQueries([`/post/list`]);
          router.push("/user/post/profile");
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
  const useCreateFollow = (id: any) => {
    const { mutate, isLoading } = useMutation(
      (id: any) => {
        return axiosAuthClient.get(`/following/create/${id}`);
      },
      {
        onSuccess: (response) => {
          toast("followed !", {
            icon: "👍",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
          queryClient.invalidateQueries([`/auth/profile/${id}`]);
          queryClient.invalidateQueries([`/auth/profile`]);
          queryClient.invalidateQueries([`/auth/detail`]);
          queryClient.invalidateQueries([`/followers/list/followers`]);
          queryClient.invalidateQueries([`/followers/list/detail`]);
          queryClient.invalidateQueries([`/following/list/followed`]);
        },
        onError: (error) => {
          toast.error("Tidak Berhasil Mengcreate like");
        },
      }
    );
    return { mutate, isLoading };
  };
  const useDeleteFollow = (id: string) => {
    const { mutate, isLoading } = useMutation(
      (id: string) => {
        return AxiosClient.delete(`/following/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toast("unfollowed!", {
            icon: "😒",
            position: "top-right",
            duration: 1000,
          });
          queryClient.invalidateQueries([`/post/detail/${id}`]);
          queryClient.invalidateQueries([`/post/detail`]);
          queryClient.invalidateQueries([`/auth/profile/${id}`]);
          queryClient.invalidateQueries([`/auth/profile`]);
          queryClient.invalidateQueries([`/auth/detail`]);
          queryClient.invalidateQueries([`/followers/list/followers`]);
          queryClient.invalidateQueries([`/followers/list/detail`]);
          queryClient.invalidateQueries([`/following/list/followed`]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toast.error("eror");
          } else {
            toast.error("ada kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };
  const useCreateReport = (id : string) => {
    const { mutate, isLoading } = useMutation(
      (payload : any) => {
        return axiosAuthClient.post(`/report/create/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toast.success("your report successfully have been send", {
            position: "top-right",
          });
          queryClient.invalidateQueries([`/post/list`]);
          queryClient.invalidateQueries([`/post/detail`]);
        },
        onError: (error) => {
          toast.error("Tidak Berhasil Mengcreate Comment");
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    usePostList,
    useDetailPost,
    useLikedPostList,
    useSavedPostList,
    useCreateComment,
    useCommentList,
    useCreateLike,
    useCreateSave,
    useDeleteLike,
    useDeleteSave,
    useDeletePost,
    useCreateFollow,
    useDeleteFollow,
    useUpdatePost,
    useTagList,
    useDetailTag,
    useCreateReport,
  };
};

export default usePostModule;
