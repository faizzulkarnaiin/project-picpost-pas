import { ChangeEvent, useEffect, useState } from "react";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const usePagination = <T extends PaginationParams>(defaultParams: T) => {
  let [params, setParams] = useState<T>(defaultParams);
  let [keyword, setKeyword] = useState("");
  let [filterParams, setFilterParams] = useState<T>(defaultParams);
  let [items, setiTems] = useState([]);

  const handleFilter = () => {
    setFilterParams({ ...params, page: 1 });
    setParams((prev) => {
      return {
        ...prev,
        page: 1,
      };
    }); 
  };

  const handleKeyword = (keyword: string) => {
    setFilterParams({ ...params, keyword: keyword, page: 1 });
  };

  const handleSearch = (e: ChangeEvent<any>) => {
    setKeyword(e.target.value);
    // setFilterParams({ ...params, keyword: e, page: 1 });
  };
  useEffect(() => {
    const interval = setTimeout(() => {
      handleKeyword(keyword);
    }, 500);

    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
  };

  const handlePageSize = (e: ChangeEvent<any>) => {
    setParams((params) => ({ ...params, pageSize: e.target.value, page: 1 }));
    setFilterParams((params) => ({
      ...params,
      pageSize: e.target.value,
      page: 1,
    }));
  };

  const handlePage = (page: number) => {
    setParams((params) => ({ ...params, page: page }));
    setFilterParams((params) => ({ ...params, page: page }));
  };

  const fetchMoreData = (page : any) => {
    setParams((params) => ({ ...params, page: page + 1 }));
    setFilterParams((params) => ({ ...params, page: page + 1 }));
  }
  const handleTagFilter = (tag : any) => {
    setFilterParams({ ...params, page: 1, tagId : tag });
    setParams((prev) => {
      return {
        ...prev,
        page: 1,
        tagId : tag
      };
    });
  };



  return {
    items,
    setiTems,
    params,
    keyword,
    setParams,
    handleFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
    handleSearch,
    fetchMoreData,
    setFilterParams ,
    handleKeyword,
    handleTagFilter
  };
};
