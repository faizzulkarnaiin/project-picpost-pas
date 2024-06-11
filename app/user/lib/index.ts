import useAxiosAuth from "@/app/hook/useAxiosAuth";
import { usePagination } from "@/app/hook/usePagination";
import { AxiosClient } from "@/app/lib/axiosClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const useAppModule = () => {
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const defaultParams = {
    // nama_kategori: "",
    page: 1,
    pageSize: 20,
    tagId: null
  };
  const defaultParamsPostByUserLogin = {
    // nama_kategori: "",
    page: 1,
    pageSize: 30,
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
      handleTagFilter
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
      handleFilter,
      handleClear,
      setFilterParams,
      handleTagFilter
    };
  };
  const getDetailPost = async (id: string): Promise<any> => {
    return axiosAuthClient
      .get(`/post/detail/${id}`)
      .then((res) => res.data.data);
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
  const getLikedPost = async () => {
    return axiosAuthClient.get("/like/listById").then((res) => res.data);
  };

  const useLikedPostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
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
  const getPostByUserLogin = async () => {
    return axiosAuthClient.get("/post/listById").then((res) => res.data);
  };

  const usePostByUserLoginList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParamsPostByUserLogin);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/post/listById"],
      () => getPostByUserLogin(),
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
  const usePostByUserIdList = (id: string) => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParamsPostByUserLogin);
    const { data, isFetching, isLoading, isError } = useQuery(
      [`/post/list/user/${id}`],
      () =>
        axiosAuthClient.get(`/post/list/user/${id}`).then((res) => res.data),
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
    return axiosAuthClient.get("/save-post/listById").then((res) => res.data);
  };

  const useSavedPostList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
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
  const getFollowers = async () => {
    return axiosAuthClient
      .get("/followers/list/followers")
      .then((res) => res.data);
  };

  const useFollowersList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/followers/list/followers"],
      () => getFollowers(),
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
  const getFollowersById = async (id: string) => {
    return axiosAuthClient
      .get(`/followers/list/detail/${id}`)
      .then((res) => res.data);
  };
  const useFollowersListById = (id: string) => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      [`/followers/list/detail/${id}`],
      () => getFollowersById(id),
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
  const getFollowing = async () => {
    return axiosAuthClient
      .get("/following/list/followed")
      .then((res) => res.data);
  };

  const useFollowingList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/following/list/followed"],
      () => getFollowing(),
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
  const useFollowingListById = (id: string) => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      [`/following/list/followed/${id}`],
      () =>
        axiosAuthClient
          .get(`/following/list/followed/${id}`)
          .then((res) => res.data),
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

  return {
    usePostList,
    useDetailPost,
    useLikedPostList,
    useSavedPostList,
    usePostByUserLoginList,
    useFollowersList,
    useFollowingList,
    usePostByUserIdList,
    useFollowingListById,
    useFollowersListById,
  };
};

export default useAppModule;
