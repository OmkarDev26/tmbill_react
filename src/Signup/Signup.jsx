import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { signup } from "../api/auth";
import swal from "sweetalert2";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");
  const [password_status, setPasswordStatus] = useState(null);
  const [validPassword, setValidPassword] = useState("");

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one characters `@,-,_,!`</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  useEffect(() => {
    if (passwordRegex.test(password)) {
      setValidPassword(true);
    } else setValidPassword(false);
  }, [password]);

  useEffect(() => {
    if (validPassword && c_password.length == password.length) {
      c_password === password
        ? setPasswordStatus(true)
        : setPasswordStatus(false);
    } else if (c_password.length > password.length) {
      setPasswordStatus(false);
    } else setPasswordStatus(null);
  }, [c_password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        email,
        name,
        password,
      };
      const data = await signup(payload);
      if (data?.code == 201) {
        swal.fire({
          title: "Sucess",
          text: data?.message,
          icon: "success",
        });
      }
    } catch (err) {
      swal.fire({
        title: "Error",
        text: err?.response?.data,
        icon: "error",
      });
    } finally {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-lvh">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-2xl font-bold mb-10">Register</p>
          <div className="mb-1 mt-3">
            <label
              className="flex justify-start text-gray-600 text-sm"
              htmlFor="name"
            >
              Name
            </label>
            <InputText
              id="name"
              className="flex border-2 p-2 w-full rounded-md"
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Email"
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
              header={header}
              footer={footer}
              id="password"
              value={password}
              className="flex border-2 w-full rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              placeholder="Enter Password..."
            />
          </div>
          <div className="mb-1 mt-3">
            <label
              className="flex justify-start text-gray-600 text-sm"
              htmlFor="c_password"
            >
              Confirm Password
            </label>
            <Password
              id="c_password"
              value={c_password}
              className="flex border-2 w-full rounded-md"
              onChange={(e) => setConfirmPassword(e.target.value)}
              feedback={false}
              placeholder="Enter Password..."
            />
            {password_status == false && (
              <p className="text-xs text-red-500">Password does not match</p>
            )}
          </div>
          <Button
            className="flex w-full justify-center mt-5 mb-2 p-2 rounded-md"
            label="Submit"
          />
          Already Registered?{" "}
          <NavLink className="underline text-blue-500" to="/">
            Login
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Signup;
