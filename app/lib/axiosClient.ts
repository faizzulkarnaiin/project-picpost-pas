import axios, { AxiosInstance } from "axios";

export const AxiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3310",
  headers: { "X-Custom-Header": "foobar" },
});
export const AxiosClientRefresh: AxiosInstance = axios.create({
  baseURL: "http://localhost:3310",
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
    total_page: number;
  };
}

export interface BaseResponseSuccess {
  status: string;
  message: string;
  data?: any;
}
