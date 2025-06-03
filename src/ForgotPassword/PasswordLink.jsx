import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { checkUser, resetLink } from "../api/auth";
import { NavLink } from "react-router-dom";

function debounce(cb, delay) {
  try {
    let timeId;
    return function (...args) {
      if (timeId) {
        clearTimeout(timeId);
      }

      timeId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  } catch (error) {
    console.log(error);
  }
}

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [userFound, setUserFound] = useState(true);
  const [linkSent, setLinkSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");
  const [password_status, setPasswordStatus] = useState(null);

  const debouncedHandleUser = useRef();

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleUser = async () => {
    try {
      const data = await checkUser({ email: email });
      if (data?.user == true) {
        setUserFound(false);
      }
    } catch (error) {
      setUserFound(true);
    }
  };
  useEffect(() => {
    if (c_password.length == password.length) {
      c_password === password
        ? setPasswordStatus(true)
        : setPasswordStatus(false);
    } else if (c_password.length > password.length) {
      setPasswordStatus(false);
    } else setPasswordStatus(null);
  }, [c_password]);

  useEffect(() => {
    debouncedHandleUser.current = debounce(() => {
      handleUser();
    }, 1000);
  }, []);

  useEffect(() => {
    if (emailRegex.test(email)) {
      debouncedHandleUser.current();
    }
  }, [email]);

  const handleResetLink = async () => {
    try {
      setLoader(true);

      const data = await resetLink({ email });
      if (data?.code == 200) {
        setLinkSent(true);
      } else setLinkSent(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-lvh">
        {linkSent == false && (
          <div className="">
            <p className="text-2xl font-bold mb-10">Reset Password</p>
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
              <label className="flex justify-end  text-sm mt-1">
                Already Registered?{" "}
                <NavLink className="text-gray-600" to="/">
                  Login
                </NavLink>
              </label>
              <Button
                onClick={() => handleResetLink()}
                disabled={userFound || loader}
                className="mt-3 p-2"
                label="Send Reset Link"
              />
            </div>
          </div>
        )}

        {linkSent == true && (
          <div className="">
            <p className=" font-bold mb-10">
              If you have your email registered with us. You'll get an email
              with password reset link.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
