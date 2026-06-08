import { useDispatch, useSelector } from "react-redux";

import {
  clearAuthError,
  loginUser,
  logoutUser,
  selectAuthError,
  selectAuthLoading,
  selectAuthToken,
  selectAuthUser,
  selectIsAuthenticated,
} from "../features/auth/authSlice";

function useAuth() {
  const dispatch = useDispatch();

  const user = useSelector(selectAuthUser);
  const token = useSelector(selectAuthToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const login = async (payload) => {
    const resultAction = await dispatch(loginUser(payload));

    if (loginUser.fulfilled.match(resultAction)) {
      return {
        success: true,
        message: "Login successful",
      };
    }

    return {
      success: false,
      message: resultAction.payload || "Invalid user",
    };
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
  };
}

export default useAuth;