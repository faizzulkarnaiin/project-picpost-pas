"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { InputAdornment, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { start } from "repl";
import useAppModule from "@/app/user/lib";
import useAuthModule from "../lib";
import { RegisterPayload } from "../interface/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { data: session, status } = useSession();
  const { useRegister } = useAuthModule();
  const { mutate, isLoading } = useRegister();
  const onSubmit = async (payload: RegisterPayload) => {
    mutate(payload);
  };
  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user/post");
      }
    }
  }, [isLoading, session, status]);

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
      <div className="absolute top-4 left-4 md:static md:p-5">
        <Link href={"/main"}>
          <h3>
            <ArrowBackIcon className="text-teal-900"></ArrowBackIcon>
          </h3>
        </Link>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center md:justify-start justify-center md:pt-24">
        <Link href={"/main"}>
          <h1 className="pb-1 text-teal-900 font-semibold text-2xl">PicPost</h1>
        </Link>
        <h2 className="font-bold text-3xl">Welcome to PicPost!</h2>
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
              <div className="">
                <TextField
                  className="w-[400px]"
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
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
        <div className="mt-12 flex flex-col gap-3">
          <p>
            Already have an account?{" "}
            <Link href={"login"}>
              <span className="text-teal-900 font-bold">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="diff lg:w-1/2 aspect-[16/9] invisible lg:visible">
          <div className="diff-item-1">
            <div className="bg-white text-teal-900 text-9xl font-black grid place-content-center">
              Pic
            </div>
          </div>
          <div className="diff-item-2">
            <div className="bg-teal-900 text-white text-9xl font-black grid place-content-center">
              Post
            </div>
          </div>
          <div className="diff-resizer"></div>
        </div>
    </div>
  );
};

export default Register;
