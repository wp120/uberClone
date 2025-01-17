import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logoutFunction = async () => {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/captains/logout",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/captain-login");
      } else {
        navigate(-1);
      }
    };
    logoutFunction();
  });

  return <div>Logging you out...</div>;
};

export default UserLogout;
