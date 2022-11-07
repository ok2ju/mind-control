import { createContext, useContext, ReactNode, useMemo } from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AxiosContext = createContext<AxiosInstance>(undefined);

interface AxiosProviderProps {
  children: ReactNode;
}

const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();

  const Axios = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000/api/v1", // leave `/api/v1` here, configure vite proxy
      headers: { "Content-Type": "application/json" },
    });

    instance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        /**
         * Note:
         * `accessToken` could be taken from `localStorage` in case if
         * `useRefreshTokens` and `cacheLocation="localstorage"` are used
         */
        const accessToken = await getAccessTokenSilently();
        if (config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    );

    return instance;
  }, []);

  return (
    <AxiosContext.Provider value={Axios}>{children}</AxiosContext.Provider>
  );
};

const useAxios = () => useContext(AxiosContext);

export { AxiosProvider, useAxios };
