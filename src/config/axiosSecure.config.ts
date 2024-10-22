import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
  });
  axiosSecure.defaults.headers.post["Content-Type"] = "application/json";
  axiosSecure.defaults.headers["Accept"] = "application/json";
  //   axiosSecure.timeout = 300000;

  //   const logOut = () => {
  //     return signOut(auth);
  //   };

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorResponse = error?.response?.data;

      const responseObject = {
        statusCode: error?.response?.status || 500,
        message: errorResponse?.message || "Something went wrong",
        errorMessages:
          errorResponse?.errorMessages || "No detailed error messages provided",
      };

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        //   have to implement logout functionality-------------
        /*  logOut()
          .then(() => {
            errorAlert(error?.response?.data);
          })
          .catch(() => {
            errorAlert("Failed to log out after token verification failed");
          }); */
      }

      return Promise.reject(responseObject);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
