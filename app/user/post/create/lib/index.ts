import useAxiosAuth from "@/app/hook/useAxiosAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PostCreatePayload } from "../interface";
import { AxiosClient, BaseResponseSuccess } from "@/app/lib/axiosClient";
import useUploadFileMulti from "@/components/useUploadMultiFile";

const useCreatePostModule = () => {
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const { uploadMultiple } = useUploadFileMulti();

  const useCreatePost = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: PostCreatePayload) => {
        return axiosAuthClient.post("/post/create", payload);
      },
      {
        onSuccess: (response: any) => {
          toast.success(response?.data.message);
        },
        onError: (error) => {
          toast.error(error as string);
          console.log(error)
        },
      }
    );

    return { mutate, isLoading };
  };

  return {
    useCreatePost,
  };
};

export default useCreatePostModule;
