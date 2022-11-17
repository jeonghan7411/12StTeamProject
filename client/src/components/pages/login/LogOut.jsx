import { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    localStorage.clear();
    window.location = "/";
  }, []);
};

export default LogOut;
