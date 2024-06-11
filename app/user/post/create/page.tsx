"use client";
import { Button, TextField } from "@mui/material";
import {
  ArrayHelpers,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
  getIn,
} from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import useCreatePostModule from "./lib";
import { useSession } from "next-auth/react";
import { PostCreatePayload } from "./interface";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useAxiosAuth from "@/app/hook/useAxiosAuth";
import useUploadFileMulti from "@/components/useUploadMultiFile";
import useAuthModule from "@/app/auth/lib";

const CreateImageSchema = Yup.object().shape({
  url: Yup.string().required("URL is required"),
});

const CreateTagSchema = Yup.object().shape({
  name: Yup.string().required("Tag name is required"),
});

const CreatePostSchema = Yup.object().shape({
  judul: Yup.string().required("Title is required"),
  konten: Yup.string().required("Content is required"),
  images: Yup.array().of(CreateImageSchema).required("Images are required"),
  tags: Yup.array().of(CreateTagSchema).required("Tags are required"),
});
const getDefaultValues = (): PostCreatePayload => ({
  judul: "",
  konten: "",
  files: undefined,
  images: [],
  tags: [{ name: "" }],
});
const page = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { uploadMultiple } = useUploadFileMulti();
  const { useCreatePost } = useCreatePostModule();
  const { data: session, status } = useSession();
  const [files, setFiles] = useState<File[]>([]);
  const { mutate, isLoading } = useCreatePost();

  const formik = useFormik<PostCreatePayload>({
    initialValues: {
      judul: "",
      konten: "",
      files: undefined,
      images: [],
      tags: [{ name: "" }],
    },
    validationSchema: CreatePostSchema,
    onSubmit: async (values) => {
      if (files.length === 0) {
        toast.error("Please enter at least 1 image");
      } else {
        try {
          const response = await uploadMultiple(files);
          if (!response || !response.data || !response.data.file) {
            throw new Error("Invalid upload response");
          }
          const imagePyld = response.data.file.map((file: any) => ({
            url: file.file_url,
          }));
          const payload = { ...values, images: imagePyld };
          mutate(payload, {
            onSuccess: () => {
              resetForm();
              setValues(getDefaultValues());
              setFiles([]);
            },
          });
        } catch (error) {
          console.error("An error occurred while uploading files:", error);
          toast.error("An error occurred while uploading files.");
        }
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    touched,
    resetForm,
    setValues,
  } = formik;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    newFiles.forEach((file) => {
      const newUrl = URL.createObjectURL(file);
      setFieldValue("images", [...(values.images || []), { url: newUrl }]);
    });
  };
  console.log(errors, "err");
  console.log(values, "val");
  console.log(profile, "profil");
  console.log(profile?.data?.isBanned, "ban");
  useEffect(() => {
    if (profile?.data?.isBanned) {
      toast.error("You have been banned cannot create a post !! ");
    }
  }, [profile]);
  return (
    <>
      <Toaster />
      <div className="w-screen h-screen   px-8 mt-6">
        <div>
          <h1 className="text-2xl font-semibold text-teal-900">Create Post</h1>
        </div>
        <div className="flex flex-col gap-2">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="mt-10 w-full h-full flex lg:flex-row flex-col gap-6 justify-between px-4 lg:px-20">
                <div className="flex flex-col gap-6 items-center">
                  <input
                    disabled={profile?.data?.isBanned === true}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png"
                    multiple
                  />
                  {files.map((file, i) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div
                        className="w-full indicator rounded-lg border-4 border-base-300 border-dashed aspect-square"
                        key={i}
                        style={{
                          backgroundImage: `url(${url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        <div className="indicator-item cursor-pointer">
                          <span
                            className="btn btn-error btn-xs btn-circle aspect-square"
                            onClick={() => {
                              const deleted = files.filter((fl) => fl !== file);
                              setFiles(deleted);
                              setFieldValue(
                                "images",
                                (values.images || []).filter(
                                  (img) => img.url !== url
                                )
                              );
                            }}
                          >
                            x
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="lg:w-1/2 w-full flex flex-col gap-6">
                  <TextField
                    disabled={profile?.data?.isBanned}
                    label="Add Title"
                    name="judul"
                    value={values.judul}
                    onChange={handleChange}
                    error={!!errors.judul}
                    helperText={errors.judul}
                    autoComplete="off"
                    id="judul"
                  />
                  <TextField
                    disabled={profile?.data?.isBanned}
                    label="Add Content"
                    name="konten"
                    id="konten"
                    value={values.konten}
                    onChange={handleChange}
                    error={!!errors.konten}
                    helperText={errors.konten}
                    autoComplete="off"
                  />
                  <FieldArray
                    name="tags"
                    render={(arrayHelpers: ArrayHelpers) => (
                      <>
                        {values.tags.map((tag, index) => (
                          <section key={index}>
                            <TextField
                              disabled={profile?.data?.isBanned}
                              label="Add Tags"
                              name={`tags[${index}].name`}
                              value={tag.name}
                              onChange={handleChange}
                              error={
                                getIn(errors?.tags?.[index], "name") &&
                                getIn(touched?.tags?.[index], "name")
                              }
                              autoComplete="off"
                              id={`tags[${index}].name`}
                            />
                            <section className="flex gap-1 pt-4">
                              <Button
                                disabled={profile?.data?.isBanned}
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => arrayHelpers.push({ name: "" })}
                              />
                              <Button
                                disabled={profile?.data?.isBanned}
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </section>
                          </section>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>
              <section className="pt-4 flex justify-end">
                <button
                  disabled={profile?.data?.isBanned}
                  className={`btn bg-teal-900 text-white hover:bg-white hover:text-teal-900`}
                  type="submit"
                >
                  {isLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Add
                </button>
              </section>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default page;
