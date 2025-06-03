import Swal from "sweetalert2";
import { logout } from "../api/auth";

export const useLogout = async () => {
  await logout();
  localStorage.removeItem("token");

  Swal.fire({
    title: "Logged out",
    text: "You have been logged out successfully.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });

  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
};
