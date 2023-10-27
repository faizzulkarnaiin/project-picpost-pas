"use client";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { type } from "os";
import { useQuery } from "react-query";
import { stat } from "fs";
import { get, validateHeaderValue } from "http";
import { start } from "repl";
import usePagination from "./lib/lib";
type Product = {
  id: number;
  nama: string;
  email: string;
  umur: number;
};
export default function User() {
  const { useBookList } = usePagination();
  const { data, isFetching, params, handlePage } = useBookList();
  const [items, setItems] = useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pagination, setPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let [searchNama, setSearchNama] = useState("");
  const totalPage = 3;
  const pageSize = 10;
  const getData = async () => {
    // let url = `http://localhost:3000/users/list?pageSize=${pageSize}&page=${currentPage}&nama=${searchNama}`;
    let url = `http://localhost:3000/users/list?nama=${searchNama}`;
    return axios.get(url).then((res) => {
      console.log(res);
      console.log("items", items);
      console.log("page", pagination);
      return setItems(res.data.data);
    });

  };
  // const getBookList = async (params : any) => {
  //   return axios.get("http://localhost:3000/users/list", {
  //     params : params
  //   }).then((res) => {
  //     console.log("res query", res);
  //     return res.data;
  //   });
  // };
  const getDetail = (id: number) => {
    axios.get(`http://localhost:3000/users/detail/${id}`);
  };

  const deleteItem = (id: number) => {
    axios
      .delete(`http://localhost:3000/users/delete/${id}`)
      .then((response) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      });
    // getData();
    // console.log(Rsponse)
  };
  

;
  return (
    <>
      <Filter
        setSearchNama={setSearchNama}
        searchNama={searchNama}
        getData={getData}
      />
      <Get
        items={items}
        setIsEditModalOpen={setIsEditModalOpen}
        deleteItem={deleteItem}
      />
      <Pagination page={params.page} pageSize={params.pageSize} handlePageSize={() => console.log("ok")} handlePage={handlePage} pagination={data && data.pagination} />
    </>
  );
  }

function AddNewItem() {
  let [isOpen, setIsopen] = useState(false);
  let [nama, setNama] = useState("");
  let [umur, setUmur] = useState("");
  let [email, setEmail] = useState("");
  let [tanggal_lahir, setTanggal_lahir] = useState("");
  let [status, setStatus] = useState("");
  let [isOpen2, setIsopen2] = useState(false);
  async function handleAddItem() {
    const userData = {
      nama,
      email,
      umur: parseInt(umur),
      tanggal_lahir: parseInt(tanggal_lahir),
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        userData
      );

      console.log("Berhasil menambahkan user:", response.data);
      setIsopen2(true);
    } catch (error) {
      console.error("Error menambahkan user:", error);
    }
    setIsopen(!isOpen);
    setEmail("");
    setNama("");
    setStatus("");
    setTanggal_lahir("");
    setUmur("");
  }

  return (
    <>
      {isOpen2 && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <div className="flex gap-2">
                <h3>berhasil menambahkan user</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-[100px]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </form>
            <div className="modal-action">
              <button
                className="btn btn-accent mt-2"
                onClick={() => setIsopen2(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </dialog>
      )}
      <div className="flex ml-12 mt-12">
        <button
          className="btn btn-secondary mb-4 mt-4"
          onClick={() => setIsopen((isOpen = true))}
        >
          add new
        </button>
      </div>
      {isOpen ? (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <label className="label">
                <span className="label-text">Masukkan nama</span>
              </label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">Masukkan email</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">Masukkan umur</span>
              </label>
              <input
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">Masukkan tanggal lahir</span>
              </label>
              <input
                value={tanggal_lahir}
                onChange={(e) => setTanggal_lahir(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">Masukkan status</span>
              </label>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </form>
            <div className="modal-action">
              <button
                className="btn btn-error mt-2"
                onClick={() => setIsopen(false)}
              >
                Cancel
              </button>
              <button onClick={handleAddItem} className="btn btn-primary mt-2">
                Add
              </button>
            </div>
          </div>
        </dialog>
      ) : (
        <></>
      )}
    </>
  );
}

function Get({ items, setIsEditModalOpen, deleteItem }: any) {
  const { useBookList } = usePagination();
  const { data, isFetching, params, handlePage } = useBookList();
  return (
    <>
      <div className="overflow-x-hidden scrollbar-thin ">
        <AddNewItem />
        <div className="w-screen h-screen flex flex-col justify-center items-center ">
          <table className="table w-[900px]">
            <thead>
              <tr className="bg-base-200">
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Umur</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((user: any, index: any): any => (
                <tr key={user.id}>
                  <ItemsList
                    deleteItem={deleteItem}
                    user={user}
                    {...user}
                    index={index}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ItemsList({
  nama,
  email,
  umur,
  index,
  id,
  deleteItem,
  user,
  pagination,
}: any) {
  return (
    <>
      <td>{index + 1}</td>
      <td>Nama: {nama}</td>
      <td>Email: {email}</td>
      <td>Umur: {umur}</td>
      <td className="flex flex-wrap gap-1">
        <Update {...user} />
        <button className="btn btn-error" onClick={() => deleteItem(id)}>
          Delete
        </button>
      </td>
    </>
  );
}

function Update({ id, nama, user, email, umur, tanggal_lahir, status }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [namaUser, setNamaUser] = useState(nama);
  const [emailUser, setEmailUser] = useState(email);
  const [umurUser, setUmurlUser] = useState(umur);
  const [tanggal_lahirUser, setTanggal_lahir] = useState(tanggal_lahir);
  const [statusUser, setStatus] = useState(status);

  const closeModal = () => {
    setIsOpen(false);
  };
  // const GetItemById = (idd: number) => {
  //   try {
  //     axios.get(`http://localhost:3000/users/detail/${idd}`);
  //     console.log("berhasil");
  //     setIsOpen(true);
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  const UpdateItemSubmit = async (id1: number) => {
    const data = {
      namaUser,
      emailUser,
      umurUser,
      tanggal_lahirUser,
      statusUser,
    };

    await axios
      .put(`http://localhost:3000/users/update/${id1}`, data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating user:", error);
      });

    setIsOpen(false);
  };

  return (
    <>
      <button
        className=" btn btn-primary w-[50px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        Edit
      </button>
      {isOpen ? (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={namaUser}
                onChange={(e) => setNamaUser(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
              />
              <label className="label">
                <span className="label-text">Umur</span>
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={umurUser}
                onChange={(e) => setUmurlUser(Number(e.target.value))}
              />
              <label className="label">
                <span className="label-text">tanggal lahir</span>
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={tanggal_lahirUser}
                onChange={(e) => setTanggal_lahir(Number(e.target.value))}
              />
              <label className="label">
                <span className="label-text">status</span>
              </label>
              <input
                className="input input-bordered w-full max-w-xs"
                type="text"
                value={statusUser}
                onChange={(e) => setStatus(e.target.value)}
              />
            </form>
            <div className="modal-action">
              <button
                className="btn btn-error mt-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mt-2"
                onClick={() => UpdateItemSubmit(id)}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      ) : (
        <div className=""></div>
      )}
    </>
  );
}
interface PaginationProps {
  handlePageSize: (e: ChangeEvent<any>) => void;
  handlePage: (page: number) => void;

  page: number | string;
  pageSize: number | string;

  pagination:
    | {
        page: number;
        pageSize: number;
        total: number;
        total_page: number;
      }
    | undefined;
}

// function Pagination({ getData, totalPage, currentPage, setCurrentPage }: any) {
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPage) {
//       setCurrentPage(newPage);
//       getData();
//     }
//   };
//   useEffect(() => {
//     getData();
//     setCurrentPage(1);
//   }, []);

//   return (
//     <>
//       <div className="flex items-center justify-center mt-12 mb-12">
//         <div className="join grid grid-cols-2 w-[300px]">
//           <button
//             className="join-item btn btn-outline"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous page
//           </button>
//           <button
//             className="join-item btn btn-outline"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPage}
//           >
//             Next page
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

const Pagination: React.FC<PaginationProps> = ({
  handlePageSize,
  handlePage,
  pagination,
  page,
  pageSize,
}) => {
  
  function getPage(totalItems: number, currentPage: number, pageSize: number) {
    currentPage = currentPage;

    pageSize = pageSize;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(
      { length: endPage + 1 - startPage },
      (_, i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  let pages = getPage(
    pagination?.total || 0,
    pagination?.page || 1,
    pagination?.pageSize || 10
  );

  return (
    <>
    <div>
        <select
          value={pageSize}
          onChange={handlePageSize}
          className="px-2 py-1 text-sm text-blue-500 rounded-md  border"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <p>dari {pagination?.total} data</p>
      </div>
      {/* <div className="flex items-center justify-center mt-12 mb-12">
        <div className="join grid grid-cols-2 w-[300px]">
          <button className="join-item btn btn-outline">Previous page</button>
          <button className="join-item btn btn-outline">Next page</button>
        </div>
      </div> */}
      <div className="flex justify-center mt-6 mb-6 md:flex gap-x-3">
        {pages.pages.map((pageItem, index) => (
          <div className="join"  key={index}>
          <button
           className="join-item btn"
            onClick={() => {
              handlePage(pageItem);
            }}
         
          >
            {pageItem}
          </button>
          </div>
        ))}
      </div>
    </>
  );
};

function Filter({ setSearchNama, searchNama, getData }: any) {
  function handleSubmitChange() {
    if (searchNama) {
      getData();
    }
    if (searchNama === null || undefined) {
      <h1>tidak ada user dengan nama {searchNama}</h1>;
      alert(`tidak ada user dengan nama ${searchNama}`);
    }
    if (!searchNama || searchNama === "") {
      getData();
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <label className="input">
          <span className="input=text items-start">
            Masukkan nama untuk filter
          </span>
        </label>
        <div className="flex gap-1">
          <input
            type="text"
            value={searchNama}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setSearchNama(e.target.value);
            }}
          />
          <button className="btn" onClick={handleSubmitChange}>
            Cari
          </button>
        </div>
      </div>
    </>
  );
}
