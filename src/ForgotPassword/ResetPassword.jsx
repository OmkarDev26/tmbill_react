import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authenticate, change_password } from "../api/auth";
import { Divider } from "primereact/divider";
import swal from "sweetalert2";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [c_password, setConfirmPassword] = useState("");
  const [password_status, setPasswordStatus] = useState(null);
  const [auth, setAuth] = useState(true);
  const [calledAuth, setCalledAuth] = useState(false);

  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@-_!])[A-Za-z\d@-_!]{8,}$/;
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

  const authenticateUser = async () => {
    try {
      const data = await authenticate();
      if (data?.code == 200) {
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
  };
  useEffect(() => {
    if (params.has("token") && !calledAuth) {
      localStorage.setItem("token", params.get("token"));
      setParams({});
      authenticateUser();
      setCalledAuth(true);
    }
  }, [params, calledAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const resetPassword = async () => {
    try {
      const data = await change_password({ password: password });
      if (data?.code == 200) {
        swal
          .fire({
            title: "Success",
            icon: "success",
            text: data?.message,
            showDenyButton: false,
            confirmButtonText: "Okay",
          })
          .then((result) => {
            if (result?.isConfirmed) {
              navigate("/");
            }
          });
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex justify-center items-center h-lvh">
        {auth == true && (
          <div>
            <p className="text-2xl font-bold mb-10">Create New Password</p>
            <div className="mb-1 mt-3">
              <label
                className="flex justify-start text-gray-600 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <Password
                id="password"
                value={password}
                className="flex border-2 p-2 w-full rounded-md"
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                header={header}
                footer={footer}
              />
            </div>
            <div className="mb-1 mt-3">
              <label
                className="flex justify-start text-gray-600 text-sm"
                htmlFor="c_password"
              >
                Password
              </label>
              <Password
                id="c_password"
                value={c_password}
                className="flex border-2 p-2 w-full rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
                feedback={false}
              />
              {password_status == false && (
                <p className="text-xs text-red-500">Password does not match</p>
              )}
            </div>
            <Button
              disabled={!password_status}
              onClick={() => resetPassword()}
              className="flex w-full justify-center mt-5 p-2 rounded-md"
              label="Update"
            />
          </div>
        )}

        {auth == false && (
          <p className=" font-bold mb-10">Link has been expired or used.</p>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
