import axios, { AxiosInstance } from "axios";

export const AxiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3230",
  headers: { "X-Custom-Header": "foobar" },
});

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total: number;
    total_page: number
  };
}
