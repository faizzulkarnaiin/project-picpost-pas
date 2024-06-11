import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect } from "react";
import { AxiosClientRefresh } from "../lib/axiosClient";
import toast from "react-hot-toast";

interface SessionUser {
  id: number;
  refreshToken: string;
  accessToken: string;
  name: string;
  email: string;
}

export const useRefreshToken = () => {
  const { data: session, update } = useSession();
  //   const { toastWarning } = useToast();

  useEffect(() => {
    const requestIntercept = AxiosClientRefresh.interceptors.request.use(
      (config: any) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.refreshToken}`;
        config.headers.id = session?.user?.id;

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = AxiosClientRefresh.interceptors.response.use(
      async (response: any) => response,
      async (error: any) => {
        toast.error(error.response.message);
        // signOut();
        // window.location.replace("/auth/login");
      }
    );

    return () => {
      AxiosClientRefresh.interceptors.request.eject(requestIntercept);
      AxiosClientRefresh.interceptors.response.eject(responseIntercept);
    };
  }, [session, toast.error]);

  const refreshToken = async () => {
    if (!session) return;

    try {
      const { user } = session as Session & { user: SessionUser };

      const res = await AxiosClientRefresh.get("/auth/refresh-token");

      console.log("res", res.data);
      await update({
        ...session,
        user: {
          ...user,
          accessToken: res.data.data.access_token,
          refreshToken: res.data.data.refresh_token,
        },
      });

      return true;
    } catch {
      return false;
    }
  };

  return { refreshToken };
};
