import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, logout } from "../features/authSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BASE_URL + "/users/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/login");
          } else {
            dispatch(login({ isCaptain: false, userData: res.data.user }));
          }
          setLoading(false);
        });
    }
  }, [token, navigate, dispatch]);

  if (loading) {
    return <>Loading...</>;
  } else {
    return <>{children}</>;
  }
};

export default UserProtectWrapper;
