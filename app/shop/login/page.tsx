"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UseShopModule from "../lib/lib";
import { LoginPayload } from "../intergace/interface";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
export const CreateAccountSchema = yup.object().shape({
  email: yup
    .string()
    .email("Harus Email")
    .nullable()
    .default("")
    .required("Wajib isi email"),

  password: yup.string().nullable().default("").required("Wajib pilih"),
});

const Register = () => {
  const { useLogin } = UseShopModule();
  const { mutate, isLoading } = useLogin();
  const onSubmit = (payload: LoginPayload) => {
    mutate(payload);
  };
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center md:justify-start justify-center md:pt-24">
        <Link href={'/shop'}>
          <h1 className="pb-1 text-teal-900 font-semibold text-2xl">Website</h1>
        </Link>
        <h2 className="font-bold text-3xl">Welcome to website!</h2>
        <Toaster />
        <FormikProvider value={formik}>
          <Form>
            <div className="flex flex-col gap-4 md:w-[400px] w-full">
              <TextField
                label="email"
                variant="outlined"
                size="small"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="off"
              />
              <div>
                <TextField
                  label="Password"
                  variant="outlined"
                  size="small"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="off"
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              <button
                className={`btn  bg-teal-900 text-white hover:bg-white hover:text-teal-900`}
                type="submit"
              >
                {isLoading && <span className="loading loading-spinner"></span>}
                Sign in
              </button>
            </div>
          </Form>
        </FormikProvider>
        <p>
          Dont have an account?{" "}
          <Link href={"register"}>
            <span className="text-teal-900 font-bold">Sign up</span>
          </Link>
        </p>
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
