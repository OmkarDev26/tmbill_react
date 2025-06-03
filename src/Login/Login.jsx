import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { login } from "../api/auth";
import { Button } from "primereact/button";
import swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const data = await login({ email, password });
      if (data?.code == 200) {
        swal.fire({
          title: `Welcome Back ${data?.user?.name}`,
          text: data?.message,
          icon: "success",
        });
        localStorage.setItem("token", data?.token);
        navigate("/dashboard");
      }
    } catch (err) {
      swal.fire({
        title: "Error",
        text: "Invalid Email or Password",
        icon: "error",
      });
    } finally {
      setEmail("");
      setPassword("");
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-lvh">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-2xl font-bold mb-10">Login</p>
          <div className="mb-1 mt-3">
            <label
              className="flex justify-start text-gray-600 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <InputText
              id="email"
              className="flex border-2 p-2 w-full rounded-md"
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 mt-3">
            <label
              className="flex justify-start text-gray-600 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <Password
              id="password"
              placeholder="Enter Password..."
              value={password}
              className="flex border-2 w-full rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
            />
            <label className="flex justify-end  text-sm mt-1">
              <NavLink className="text-gray-600" to="/reset">
                Forgot Password?
              </NavLink>
            </label>
          </div>
          <div className="flex justify-center items-center mt-5 mb-2 p-2 rounded-md">
            <Button disabled={loader} label="Submit" />
          </div>
          Not Registered?{" "}
          <NavLink className="underline text-blue-500" to="/signup">
            Click here to Signup
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
