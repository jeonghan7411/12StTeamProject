import React, { useEffect } from "react";
import { useState } from "react";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import MyPageCheckPw from "./MyPageCheckPw";
import MyPagePassPw from "./MyPagePassPw";

const MyPageUpdateUser = () => {
  const [userPw, setUserPw] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    // const fetchData = async () => {
    //   await axios
    //     .get("http://localhost:5000/", { withCredentials: true })
    //     .then((response) => {
    //       if (response.data.status === 401) {
    //         alert(response.data.message);
    //         navigate("/login", { replace: true });
    //       } else if (response.data.status === 200) {
    //         getUser(setUser);
    //       }
    //     });
    // };
    // fetchData();
    authCheck();
    getUser(setUser);
  }, []);

  return (
    <React.Fragment>
      <div>
        {!userPw ? (
          <MyPageCheckPw setUserPw={setUserPw} user={user} />
        ) : (
          <MyPagePassPw user={user} setUserPw={setUserPw} />
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPageUpdateUser;
