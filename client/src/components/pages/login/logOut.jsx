import { useEffect } from "react";

const logOut = () => {
  useEffect(() => {
    localStorage.clear();
    window.location = "/";
  }, []);
};

export default logOut;
