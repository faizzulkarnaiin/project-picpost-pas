import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { AxiosClient } from "../lib/axiosClient";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = AxiosClient.interceptors.request.use(
      (config: any) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.accessToken}`;

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = AxiosClient.interceptors.response.use(
      async (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;

        if (401 === error?.response?.status && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            await refreshToken();

            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${session?.user?.accessToken}`;
            return AxiosClient(prevRequest);
          } catch (err) {
            signOut();
            window.location.replace("/auth/login");
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      AxiosClient.interceptors.request.eject(requestIntercept);
      AxiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return AxiosClient;
};

export default useAxiosAuth;
