import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // return Promise.reject(error)

        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          /* logOut()
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Logout Unintentionally",
              });
              navigate("/login");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: `${error.message}`,
                text: "Something went wrong!",
              });
            }); */
        }
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
