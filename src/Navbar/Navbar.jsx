import { Button } from "primereact/button";
import { useState } from "react";
import { useLogout } from "../utils/logout";

const Navbar = () => {
  const [loader, setLoader] = useState(false);

  //   const logout = useLogout();

  const handleLogout = async () => {
    setLoader(true);
    await useLogout();
    setLoader(false);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-end items-end">
          <Button
            disabled={loader}
            onClick={() => handleLogout()}
            icon="pi pi-sign-out"
            size="small"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
