import toast from "react-hot-toast";

const ResponseError = (err: any): void => {
  const error = err.response;

  if (error?.data) {
    toast.error(error?.data?.message);
  } else {
    toast.error(err?.message);
  }
};

export default ResponseError;
