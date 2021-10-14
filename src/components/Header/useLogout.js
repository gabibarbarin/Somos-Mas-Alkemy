import { resetUserData } from "../../store/authSlice";

export const useLogout = () => {
  localStorage.removeItem("token_id");
  resetUserData();
};
