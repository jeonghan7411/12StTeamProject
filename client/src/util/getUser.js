import axios from "axios";

export const getUser = async (setUser) => {
  await axios
    .get("http://localhost:5000/api/login/getuser", {
      withCredentials: true,
    })
    .then((response) => {
      setUser(response.data);
    });
};
