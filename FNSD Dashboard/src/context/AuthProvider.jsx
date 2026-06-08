import { useMemo, useState } from "react";

import AuthContext from "./AuthContext";
import { loginEmployeeApi } from "../services/loginApi";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("fnsd_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function getSavedToken() {
  return localStorage.getItem("fnsd_token");
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);
  const [token, setToken] = useState(getSavedToken);

  const login = async ({
    employeeId,
    selectedSiteKey,
    selectedSiteName,
    selectedEmployee,
    password,
  }) => {
    if (!employeeId || !selectedSiteKey || !selectedEmployee) {
      return {
        success: false,
        message: "Invalid user",
      };
    }

    // POST Login API sends Employee ID and selected site ID
    const result = await loginEmployeeApi({
      employeeId,
      selectedSiteKey,
      password,
    });

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Invalid user",
      };
    }

    const loggedInUser = {
      employeeId: result.user.employeeId,
      employeeName: result.user.employeeName,
      designation: result.user.designation,
      role: result.user.role,

      // This site name is the same selected site shown in Login dropdown from GET API
      selectedSiteKey,
      selectedSiteName,

      sites: selectedEmployee.sites || [],
      apiSites: result.user.apiSites || [],
    };

    setUser(loggedInUser);
    setToken(result.token);

    localStorage.setItem("fnsd_user", JSON.stringify(loggedInUser));
    localStorage.setItem("fnsd_token", result.token);

    return {
      success: true,
      message: "Login successful",
    };
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("fnsd_user");
    localStorage.removeItem("fnsd_token");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;