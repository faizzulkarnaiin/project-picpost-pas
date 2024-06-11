"use client";

import React from "react";
import useAuthModule from "../lib";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
export const ForgetPwScheme = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
});
const page = () => {
  const { data: session, status } = useSession();
  const { useForgetPw } = useAuthModule();
  const { mutate, isLoading } = useForgetPw();
  const formik = useFormik({
    initialValues: ForgetPwScheme.getDefault(),
    validationSchema: ForgetPwScheme,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload, {
        onSuccess : () => {
          resetForm()
          setValues(ForgetPwScheme.getDefault())
        } 
      });
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors, resetForm, setValues } = formik;

  return (
    <div>
      <Toaster />
      <section>
            {" "}
            <div className="w-screen h-screen flex flex-col gap-6 items-center  justify-center">
              <Link href={"/user"}>
                <h1 className="pb-1 text-teal-900 font-semibold text-2xl">
                  PicPost
                </h1>
              </Link>
              <h2 className="font-bold text-3xl">Enter Your Email</h2>
              <Toaster />
              <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4 w-[400px]">
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
                      id="email"
                    />
                    <button
                      className={`btn bg-teal-900 text-white hover:bg-white hover:text-teal-900`}
                      type="submit"
                    >
                      {isLoading && (
                        <span className="loading loading-spinner"></span>
                      )}
                      Submit
                    </button>
                  </div>
                </Form>
              </FormikProvider>
              <div className="mt-12 flex flex-col gap-3">
                <p>
                  Change Mind ?{" "}
                  <Link href={"login"}>
                    <span className="text-teal-900 font-bold">Login Page</span>
                  </Link>
                </p>
              </div>
            </div>
         
      </section>
    </div>
  );
};

export default page;
