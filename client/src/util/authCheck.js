import axios from "axios";
import { useNavigate } from "react-router-dom";

export const handleLogout = async () => {
  await axios.get("http://localhost:5000/login/api/logout", {
    withCredentials: true,
  });
  window.alert("로그아웃");
  window.location.href = "/";
};

export const authCheck = async () => {
  await axios
    .get("http://localhost:5000/login/api/login/success", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "timeout") {
        handleLogout();
      } else if (response.data === "noInfo") {
        alert("로그인이 필요합니다");
        window.location.href = "/login";
      }
    });
};

export const getUserName = async (setUserName) => {
  await axios
    .get("http://localhost:5000/login/api/login/getusername", {
      withCredentials: true,
    })
    .then((response) => {
      // setUser(response.data);
      setUserName(response.data);
    });
};