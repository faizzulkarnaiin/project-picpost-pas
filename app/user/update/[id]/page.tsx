"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import useAuthModule from "@/app/auth/lib";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const option = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

export const registerSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi"),
  bio: yup.string().default("").nullable(),
  nama_lengkap: yup.string().default("").nullable(),

  avatar: yup.string().nullable().default(""),
  gender: yup.string(),
});
const page = ({ params }: { params: { id: string } }) => {
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { mutate, isLoading } = useUpdateProfile();
  const formik = useFormik<any>({
    initialValues: {
      nama: profile?.data.nama || "",
      nama_lengkap: profile?.data.nama_lengkap || "",
      bio: profile?.data.bio || "",
      avatar: profile?.data?.avatar || "",
      file: undefined,
      id: profile?.data?.id,
      gender: profile?.data?.gender || "male",
    },
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    setFieldValue,
  } = formik;
  const router = useRouter();
  console.log(errors, "err");
  console.log(values, "val");
  console.log(profile, "prof");
  return (
    <>
      <div className="w-screen h-screen flex flex-col mt-10 px-7">
        <div className="pb-6">
          <h1 className="text-2xl text-teal-900 font-bold">Edit Profile</h1>
        </div>
        <FormikProvider value={formik}>
          <Form>
            <div className="flex flex-col w-full  h-full gap-12 items-center">
              {" "}
              <div className="flex  gap-5 items-center justify-between rounded-lg w-full  lg:w-[600px] h-[80px] p-2 bg-teal-900">
                <div className="flex items-center gap-5 rounded-lg ">
                  <img
                    className="rounded-full w-14 object-cover"
                    src={
                      values.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCc5E-o4z6uPnn8qn_ITbrlxdJ5kdmbztmg&usqp=CAU"
                    }
                    alt="user_profile"
                  />
                  <h2 className="text-white text-lg font-semibold line-clamp-1">
                    {profile?.data?.nama}
                  </h2>
                </div>
                <input type="file" id="file"  onChange={(event : any) => {
                   const file = event.target.files[0];
                   console.log(file);
   
                   let reader = new FileReader();
                   reader.onloadend = () => {
                     setFieldValue(`avatar`, reader.result);
                   };
                   reader.readAsDataURL(file);
                   setFieldValue("file", file);
                }} className="file-input w-full max-w-xs"
                 
                />
              </div>
              <div className=" w-full  lg:w-[600px]">
                <label className="mb-3 pb-3" htmlFor="">
                  <h1 className="mb-2 text-teal-900 font-semibold">Nama</h1>
                </label>
                <input
                  id="nama"
                  name="nama"
                  onChange={handleChange}
                  value={values.nama}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full h-[60px]"
                />
              </div>
              <div className=" w-full  lg:w-[600px]">
                <label className="mb-3 pb-3" htmlFor="">
                  <h1 className="mb-2 text-teal-900 font-semibold">
                    Nama lengkap
                  </h1>
                </label>
                <input
                  id="nama_lengkap"
                  name="nama_lengkap"
                  onChange={handleChange}
                  value={values.nama_lengkap}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full h-[60px]"
                />
              </div>
              <div className=" w-full  lg:w-[600px]">
                <label className="mb-3 pb-3" htmlFor="">
                  <h1 className="mb-2 text-teal-900 font-semibold">Bio</h1>
                </label>
                <input
                  id="bio"
                  name="bio"
                  onChange={handleChange}
                  value={values.bio}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full h-[80px]"
                />
              </div>
              <div className=" w-full  lg:w-[600px]">
                <InputLabel id="demo-simple-select-helper-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="gender"
                  name="gender"
                  defaultValue={"male"}
                  value={values.gender}
                  label="gender"
                  onChange={handleChange}
                >
                  {option.map((i: any, e: any) => (
                    <MenuItem key={e} value={i.value}>
                      {i.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <section className="flex justify-end p-5">
              <button className="btn bg-teal-900 text-white hover:bg-white hover:text-teal-900 hover:ring hover:ring-teal-900">
                Save changes
              </button>
            </section>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

export default page;
