import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authReducers";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLogin = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      console.log("Response from Login", response);
      dispatch(addUser(response?.data?.user));
      reset();
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  const onRegister = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      console.log("Response from Register", response);
      reset();
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    navigate,
    onLogin,
    onRegister,
  };
};
