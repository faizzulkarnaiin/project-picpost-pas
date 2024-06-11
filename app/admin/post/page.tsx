"use client";
import useAppModule from "@/app/user/lib";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridValueGetter,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useAdminModule from "../lib";
const handleDelete = (id: number | undefined) => {
  if (id) {
    console.log(`Delete post with ID: ${id}`);
    // Implementasikan logika untuk menghapus postingan di sini
  }
};

const handleBan = (id: number | undefined) => {
  if (id) {
    console.log(`Ban post with ID: ${id}`);
    // Implementasikan logika untuk memblokir postingan di sini
  }
};

const page = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataReport, setDataReport] = useState<any[]>([]);
  const {
    useBanPost,
    usePostList,
    useUnBanPost,
    useDeletePost,
    useReportPostList,
    useDeleteReport,
  } = useAdminModule();
  const { mutate, isLoading: banLoading } = useBanPost();
  const { mutate: unBanMutate, isLoading: unBanLoading } = useUnBanPost();
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeletePost();
  const { mutate: deleteReportMutate, isLoading: deleteReportLoading } =
    useDeleteReport();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nama", headerName: "Nama", width: 130 },
    {
      field: "judul",
      headerName: "Judul",
      type: "string",
      width: 250,
    },
    {
      field: "konten",
      headerName: "Konten",
      sortable: false,
      width: 250,
    },
    {
      field: "created_by",
      headerName: "created By",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.created_by?.nama || "Unknown"}</span>
      ),
    },

    {
      field: "isBanned",
      headerName: "is banned?",
      sortable: false,
      width: 80,
    },
    {
      field: "created_at",
      headerName: "Created At",
      sortable: false,
      width: 200,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteMutate(params.row?.id)}
        >
          delete
        </Button>
      ),
    },
    {
      field: "ban",
      headerName: "Ban",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="text"
          size="small"
          onClick={() => {
            if (params.row.isBanned) {
              // Jika sudah dibanned, maka lakukan unbanned
              unBanMutate(params.row.id);
            } else {
              // Jika belum dibanned, maka lakukan banned
              mutate(params.row.id);
            }
          }}
        >
          {params.row.isBanned ? "Unban" : "Ban"}
        </Button>
      ),
    },
  ];
  const {
    data: reportPost,
    isFetching: reportPostIsFethcing,
    isLoading: reportPostIsLoading,
    handleClear: reportPostHc,
    handleFilter: reportPostHf,
    handlePage: reportPostHp,
    handlePageSize: reportPostHps,
    params: reportPostParams,
    setParams: reportPostSetParams,
    setFilterParams: reportPostSetFilterParams,
    handleKeyword: reportPosthK,
    handleSearch: reportPosthS,
  } = useReportPostList();
  const reportColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "alasan", headerName: "Alasan", width: 130 },
    {
      field: "created_by",
      headerName: "Created By",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.created_by?.nama || "Unknown"}</span>
      ),
    },
    {
      field: "created_at",
      headerName: "Created At",
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.created_at || "Unknown"}</span>
      ),
      width: 200,
    },
    {
      field: "judul",
      headerName: "Judul",
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.post_id?.judul || "Unknown"}</span> // Perbaikan disini
      ),
      width: 200,
    },
    {
      field: "konten",
      headerName: "Konten",
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.post_id?.konten || "Unknown"}</span> // Perbaikan disini
      ),
      width: 200,
    },
    {
      field: "post_created_by",
      headerName: "Post Created By",
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.post_id?.created_by?.nama || "Unknown"}</span> // Perbaikan disini
      ),
      width: 200,
    },
    {
      field: "isBanned",
      headerName: "Is Banned?",
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.post_id?.isBanned ? "yes" : "no"}</span> // Perbaikan disini
      ),
      width: 80,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => deleteReportMutate(params.row?.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "ban",
      headerName: "Ban",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="text"
          size="small"
          onClick={() => {
            if (params.row.post_id?.isBanned) {
              unBanMutate(params.row.post_id.id);
            } else {
              mutate(params.row.post_id.id);
            }
          }}
        >
          {params.row.post_id?.isBanned ? "Unban" : "Ban"}
        </Button>
      ),
    },
  ];

  const router = useRouter();
  const {
    data: post,
    isFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    setParams,
    setFilterParams,
    handleKeyword,
    handleSearch,
  } = usePostList();

  console.log(reportPost);
  useEffect(() => {
    if (post?.data) {
      setData(post.data);
    }
    if (reportPost?.data) {
      setDataReport(reportPost?.data);
    }
  }, [post, reportPost]);
  console.log(post);
  return (
    <div className="mx-6">
      <div className="mb-6">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search post by judul"
            onChange={(e) => handleSearch(e)}
            onSubmit={() => handleKeyword(params.keyword)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex justify-end mb-4">
        <button className="btn bg-teal-900 text-white" onClick={handleClear}>
          Clear filter
        </button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
      <div className="w-full flex items-center justify-center mt-5 mb-5 text-teal-900 font-semibold">
        Reported Post
      </div>
      <div className="mt-6">
        <DataGrid
          rows={dataReport}
          columns={reportColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default page;
