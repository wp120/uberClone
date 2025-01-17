import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BASE_URL + "/users/logout", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          dispatch(logout());
          return navigate("/login");
        } else {
          alert(
            "There was an error logging you out. Error: " + res.data.message
          );
          return navigate(-1);
        }
      });
    // .catch((err) => {
    //   commenting this out because axios is giving an unexpected error with status 401
    //   console.log(err);
    //   alert("There was an error logging you out. Error: " + err.message);
    //   navigate(-1);
    // });
  }, [navigate, dispatch]);

  return <div>Logging you out...</div>;
};

export default UserLogout;
