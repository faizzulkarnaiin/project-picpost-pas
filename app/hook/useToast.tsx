import Swal from "sweetalert2";
export const useToast = () => {
  const toastSuccess = (message: string) => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const toastWarning = (message: string) => {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const toastError = () => {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "Ada Kesalahan",
      showConfirmButton: false,
      timer: 1500,
    });
  };
 

  return { toastError, toastWarning, toastSuccess };
};
