"use client";
import { useRouter } from "next/navigation";
import {
  ForgetPwPayload,
  LoginPayload,
  LoginResponse,
  ProfileResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  RegisterResponse,
  ResetPwPayload,
} from "../interface/page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { error } from "console";
import { AxiosClient } from "@/app/lib/axiosClient";
import useAxiosAuth from "@/app/hook/useAxiosAuth";
import useUploadFile from "@/app/hook/useUploadFile";
import toast from "react-hot-toast";
import { usePagination } from "@/app/hook/usePagination";
const useAuthModule = () => {
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();
  const router = useRouter();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return AxiosClient.post("auth/register", payload).then((res) => res.data);
  };
  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return AxiosClient.post("auth/login", payload).then((res) => res.data);
  };
  const forgetPassword = async (payload: ForgetPwPayload) => {
    return AxiosClient.post("auth/lupa-password", payload).then(
      (res) => res.data
    );
  };
  const resetPassword = async (payload: any, id: string, token: string) => {
    console.log(payload);
    return AxiosClient.post(`auth/reset-password/${id}/${token}`, payload).then(
      (res) => res.data
    );
  };
  const useResetPassword = (id: string, token: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: any) => resetPassword(payload, id, token),

      {
        onSuccess: (res) => {
          toast.success(res.data.message);
          router.push("/auth/login");
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

  const useRegister = () => {
    const { mutate, isLoading } = useMutation(
      (payload: RegisterPayload) => register(payload),
      {
        onSuccess: (response) => {
          toast.success(response.message), router.push("login");
        },
        onError: (err: any) => {
          const errorMessages = err.response.data.message;

          toast.error(errorMessages);
        },
      }
    );
    return { mutate, isLoading };
  };

  const updateProfile = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        avatar: res.data.file_url,
      };
    }

    return axiosAuthClient.put("/auth/profile/update", payload).then((res) => {
      console.log(res.data);
      return res.data;
    });
  };

  const useUpdateProfile = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProfileUpdatePayload) => updateProfile(payload),
      {
        onSuccess: async (response) => {
          toast.success(response.message);
          queryClient.invalidateQueries(["/auth/profile"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toast.error(error.response.data.message);
          }

          if (error.response.status == 400) {
            return toast.error(error.response.data.message.toString());
          }

          toast.error("Ada kesalahan");
        },
      }
    );

    return { mutate, isLoading };
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          toast.success(response.message);
          console.log(response.data);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            role: response.data.role,
            isBanned: response.data.isBanned,
            redirect: false,
          });
          console.log(response.data.id);
          console.log(response.data.role);
          if (response.data.role === "admin") {
            console.log(response.data.role);
            router.push("/admin");
          } else {
            router.push("/user");
          }
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Ada Kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };
  const useForgetPw = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ForgetPwPayload ) => forgetPassword(payload),
      {
        onSuccess: async (response) => {
          toast.success(response.message);
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Ada kesalahan");
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const useProfile = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );
    return { data, isFetching, isLoading };
  };
  const getUserProfile = (id: string) => {
    const { data, isFetching, isLoading } = useQuery(
      [`/auth/detail/${id}`],
      () => axiosAuthClient.get(`/auth/detail/${id}`).then((res) => res.data),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );
    return { data, isFetching, isLoading };
  };
  const defaultParams = {
    page: 1,
    pageSize: 10,
    keyword: "",
  };
  const getUser = async (params: any) => {
    return axiosAuthClient
      .get("/auth/list", { params })
      .then((res) => res.data);
  };

  const useUserList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
      handleSearch,
      handleKeyword,
    } = usePagination(defaultParams);
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/auth/list", [filterParams]],
      () => getUser(filterParams),
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
      handleSearch,
      handlePageSize,
      handlePage,
      handleKeyword,
    };
  };

  return {
    useRegister,
    useLogin,
    useProfile,
    useForgetPw,
    useResetPassword,
    useUpdateProfile,
    getUserProfile,
    useUserList,
  };
};
export default useAuthModule;
