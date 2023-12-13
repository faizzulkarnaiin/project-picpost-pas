"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { InputAdornment, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UseShopModule from "../lib/lib";
import { RegisterPayload } from "../intergace/interface";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { start } from "repl";
export const CreateAccountSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Too Short!"),

  email: yup
    .string()
    .email("Harus Email")
    .nullable()
    .default("")
    .required("Wajib isi"),

  password: yup.string().nullable().default("").required("Wajib pilih"),
});

const Register = () => {
  const { useCreateRegister } = UseShopModule();
  const { mutate, isLoading } = useCreateRegister();
  const onSubmit = async (payload: RegisterPayload) => {
    mutate(payload);
  };

  const formik = useFormik({
    initialValues: CreateAccountSchema.getDefault(),
    validationSchema: CreateAccountSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center md:justify-start justify-center md:pt-24">
        <Link href={"/shop"}>
          <h1 className="pb-1 text-teal-900 font-semibold text-2xl">Website</h1>
        </Link>
        <h2 className="font-bold text-3xl">Welcome to website!</h2>
        <Toaster />
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 md:w-[400px] w-full">
              <TextField
                label="nama"
                variant="outlined"
                size="small"
                name="nama"
                value={values.nama}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.nama}
                helperText={errors.nama}
              />

              <TextField
                label="email"
                variant="outlined"
                size="small"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <div>
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  name="password"
                  type={showPassword ? "text" : "password"} // Ganti type berdasarkan showPassword
                  value={values.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              <button
                className="btn bg-teal-900 text-white hover:bg-white hover:text-teal-900"
                type="submit"
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                Sign in
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className="lg:w-1/2 bg-teal-900 hidden w-0 lg:flex">
        <div className="flex w-full justify-end p-5">
          <h3 className="text-slate-100 font-semibold text-xl">grouse</h3>
        </div>
      </div>
    </div>
  );
};

export default Register;
