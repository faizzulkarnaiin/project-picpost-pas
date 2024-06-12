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
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useUploadFileMulti from "@/components/useUploadMultiFile";
import usePostModule from "../../lib";
import { PostUpdatePayload } from "../../create/interface";

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

const page = ({ params }: { params: { id: string } }) => {
  const { uploadMultiple } = useUploadFileMulti();
  const { useUpdatePost, useDetailPost } = usePostModule();
  const { data: session, status } = useSession();
  const { mutate, isLoading } = useUpdatePost(params.id);
  const { data, isLoading: detailLoading } = useDetailPost(params.id);
  const [files, setFiles] = useState<File[]>([]);

  const formik = useFormik<PostUpdatePayload>({
    initialValues: {
      judul: data?.judul,
      konten: data?.konten,
      files: undefined,
      images: data?.images,
      tags: data?.tags || [{ name: "" }],
    },
    validationSchema: CreatePostSchema,
    onSubmit: async (values) => {
      try {
        let imagePyld = values.images;

        if (files.length > 0) {
          const response = await uploadMultiple(files);
          if (!response || !response.data || !response.data.file) {
            throw new Error("Invalid upload response");
          }
          imagePyld = response.data.file.map((file: any) => ({
            url: file.file_url,
          }));
        }

        const payload = { ...values, images: imagePyld };
        mutate(payload, {
          onSuccess: () => {
            toast.success("Post updated successfully");
          },
          onError: (error) => {
            console.error("An error occurred while updating post:", error);
            toast.error("An error occurred while updating post.");
          },
        });
      } catch (error) {
        console.error("An error occurred while uploading files:", error);
        toast.error("An error occurred while uploading files.");
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
    const fileUrls = newFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setFieldValue("images", [
      ...(values.images || []),
      ...fileUrls.map((url) => ({ url })),
    ]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages: any   = [...(values.images || [])];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setFieldValue("images", newImages);
  };

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen px-8 mt-6">
        <div>
          <h1 className="text-2xl font-semibold text-teal-900">Update Post</h1>
        </div>
        <div className="flex flex-col gap-2">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="mt-10 w-full h-full flex lg:flex-row flex-col gap-6 justify-between px-4 lg:px-20">
                <div className="flex flex-col gap-6 items-center">
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png"
                    multiple
                  />
                  {values.images &&
                    values.images.map((image, index) => (
                      <div
                        className="w-full indicator rounded-lg border-4 border-base-300 border-dashed aspect-square"
                        key={index}
                        style={{
                          backgroundImage: `url(${image.url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        <div className="indicator-item cursor-pointer">
                          <span
                            className="btn btn-error btn-xs btn-circle aspect-square"
                            onClick={() => handleRemoveImage(index)}
                          >
                            x
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="lg:w-1/2 w-full flex flex-col gap-6">
                  <TextField
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
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => arrayHelpers.push({ name: "" })}
                              />
                              <Button
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
              <section className="pt-4">
                <button
                  className={`btn bg-teal-900 text-white hover:bg-white hover:text-teal-900 w-full`}
                  type="submit"
                >
                  {isLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Save Changes
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
