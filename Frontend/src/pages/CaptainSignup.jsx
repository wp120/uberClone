import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleData, setVehicleData] = useState({
    color: "",
    plate: "",
    capacity: "",
    vehicleType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: vehicleData,
    };

    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/captains/register",
      newCaptain
    );

    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      dispatch(login({ isCaptain: true, captainData: response.data.captain }));
      navigate("/captain-home");
    } else {
      alert("Please try again. Error: ", response.data.message);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleData({ color: "", plate: "", capacity: "", vehicleType: "" });
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg w-full  font-medium mb-2">
            What&apos;s our Captain&apos;s name
          </h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What&apos;s our Captain&apos;s email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Vehicle Details</h3>

          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle color"
              value={vehicleData.color}
              onChange={(e) => {
                setVehicleData({ ...vehicleData, color: e.target.value });
              }}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle plate"
              value={vehicleData.plate}
              onChange={(e) => {
                setVehicleData({ ...vehicleData, plate: e.target.value });
              }}
            />
          </div>

          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle capacity"
              value={vehicleData.capacity}
              onChange={(e) => {
                setVehicleData({ ...vehicleData, capacity: e.target.value });
              }}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleData.vehicleType}
              onChange={(e) => {
                setVehicleData((prev) => ({
                  ...prev,
                  vehicleType: e.target.value,
                }));
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="Password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight my-2">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
