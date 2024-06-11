import useAxiosAuth from "@/app/hook/useAxiosAuth";

const useUploadFiles = () => {
  const axiosAuthClient = useAxiosAuth();

  const uploadMultiple = async (files: File[]): Promise<any> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await axiosAuthClient.post("/upload/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };

  return { uploadMultiple };
};

export default useUploadFiles;
