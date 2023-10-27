import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

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
interface User {
  id: number;
  nama: string;
  email: string;
  umur: number | undefined | string;
  created_at: string;
  updated_at: string;
}

export interface BookListResponse extends BaseResponsePagination {
  data: User[];
}

export interface BookListFilter extends Partial<User> {
  from_year?: string;
  to_year?: string;
  page: number;
  pageSize: number;
}

const usePagination = () => {
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };
  const [page, setPage] = useState();
  const getBookList = async (
    params: BookListFilter
  ): Promise<BookListResponse> => {
    return axios
      .get("http://localhost:3000/users/list", {
        params: params,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.pagination);
        // console.log(page);
        // setPage(res.data.pagination);
        return res.data;
      });
  };
  const useBookList = () => {
    let [params, setParams] = useState<BookListFilter>(defaultParams);
    let [filterParams, setFilterParams] =
      useState<BookListFilter>(defaultParams);

    const handlePage = (page: number) => {
      setParams((params) => ({ ...params, page: page }));
      setFilterParams((params) => ({ ...params, page: page }));
    };

    const { data, isFetching, isLoading } = useQuery(
      ["/book/list", [filterParams]],
      () => getBookList(filterParams),
      {
        select: (response) => response,
      }
    );
    return { data, isFetching, isLoading, params, handlePage };
  };
  return { useBookList };
};

export default usePagination;
