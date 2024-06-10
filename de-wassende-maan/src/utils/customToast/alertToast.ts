import { ToastOptions, TypeOptions, toast } from "react-toastify"

import CustomToastLayout from "@/utils/customToast/CustomToastLayout"

const alertToast = (type: TypeOptions = "success", text: string, options: ToastOptions = {}) => {
  toast((props) => CustomToastLayout({ text, type, ...props }), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    draggable: false,
    progress: undefined,
    closeButton: false,
    bodyStyle: {
      borderRadius: "0.5rem",
      padding: "0rem 0rem",
    },
    style: {
      padding: "0rem 0rem",
    },
    progressClassName: "h-line",
    type: type,
    icon: false,
    ...options,
  })
}

export default alertToast