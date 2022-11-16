import axios from "axios";
import { useNavigate } from "react-router-dom";

export const handleLogout = async () => {
  await axios.get("http://localhost:5000/api/logout", {
    withCredentials: true,
  });
  window.alert("로그아웃");
  window.location.reload();
};

export const authCheck = async () => {
  await axios
    .get("http://localhost:5000/api/login/success", {
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
