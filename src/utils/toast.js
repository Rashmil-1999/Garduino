import { toast } from "react-toastify";

export function createToast(error, type = "error") {
  if (type === "error") {
    console.log(error);
  }

  toast(error.message ? error.message : error, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    type,
  });
}
