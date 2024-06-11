"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useAuthModule from "../auth/lib";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useAdminModule from "./lib";

const page = () => {
  const { useBanUser, useUnBanUser, useDeleteUser } = useAdminModule();
  const { mutate, isLoading: banLoading } = useBanUser();
  const { mutate: unBanMutate, isLoading: unBanLoading } = useUnBanUser();
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteUser();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nama", headerName: "nama", width: 130 },
    {
      field: "avatar",
      headerName: "avatar",
      type: "string",
      width: 200,
    },
    {
      field: "email",
      headerName: "email",
      sortable: false,
      width: 200,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "gender",
      headerName: "gender",
      sortable: false,
      width: 80,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
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
  let [data, setData] = useState<any>([]);
  const router = useRouter();

  const { useProfile, useUserList } = useAuthModule();

  const {
    data: user,
    isFetching: userIsFetching,
    isLoading,
    handleClear,
    handleFilter,
    handlePage,
    handlePageSize,
    params,
    handleSearch,
    setParams,
    handleKeyword,
  } = useUserList();
  console.log(user?.data);
  useEffect(() => {
    if (user?.data) {
      setData((prevItems: any) => [...prevItems, ...user.data]);
    }
  }, [user]);
  return (
    <div className="mx-6">
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
      {/* <div className="">
      <button className="btn" onClick={() => signOut()}>
        pppppppppppp logout
      </button>
      </div> */}
    </div>
  );
};

export default page;
