import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, logout } from "../features/authSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
const CaptainProtectWrapper = ({ children }) => {
  const [loading, isLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    } else {
      axios
        .get(import.meta.env.VITE_BASE_URL + "/captains/profile", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/captain-login");
          } else {
            dispatch(login({ isCaptain: true, captainData: res.data.captain }));
          }
          isLoading(false);
        });
    }
  }, [token, navigate, dispatch]);

  return loading ? <>Loading...</> : <>{children}</>;
};

export default CaptainProtectWrapper;
