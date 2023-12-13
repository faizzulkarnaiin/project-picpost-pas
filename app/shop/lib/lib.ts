import { AxiosClient } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { LoginPayload, RegisterPayload } from "../intergace/interface";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const UseShopModule = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const register = async (payload: RegisterPayload) => {
        return AxiosClient.post('/user/register', payload).then((res) => res.data);
      }
      const login = async (payload: LoginPayload) => {
        return AxiosClient.post("/user/login", payload).then((res) => res.data);
      };
   
  const useCreateRegister = () => {
    const { mutate, isLoading } = useMutation(
        (payload : RegisterPayload) => register(payload),
        {
            onSuccess : (res) => {
                toast.success(res.message, {
                    position: "top-right",
                    duration: 1800,
                  }),
                  router.push("login")
            },
            onError : (err:any) => {
                toast.error(err.response.data.message , {
                    position : 'top-right',
                    duration : 1000
                })
                console.log(err)
            }
        }   
    );
    return { mutate, isLoading}
  };
  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          toast.success(response.message);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            redirect: false,
          });

          router.push("/shop");
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toast.error(error.response.data.message);
          } else {
            toast.error("ada kesalahan")
          }
        },
      }
    );

    return { mutate, isLoading };
  };
  return { useCreateRegister, useLogin };
};

export default UseShopModule;
