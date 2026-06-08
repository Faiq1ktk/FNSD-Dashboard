import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginEmployeeApi } from "../../services/loginApi";

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

function saveAuthToStorage(user, token) {
  localStorage.setItem("fnsd_user", JSON.stringify(user));
  localStorage.setItem("fnsd_token", token);
}

function clearAuthFromStorage() {
  localStorage.removeItem("fnsd_user");
  localStorage.removeItem("fnsd_token");
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginPayload, { rejectWithValue }) => {
    const {
      employeeId,
      password,
      selectedSiteKey,
      selectedSiteName,
      selectedEmployee,
    } = loginPayload;

    const result = await loginEmployeeApi({
      employeeId,
      password,
      selectedSiteKey,
    });

    if (!result.success) {
      return rejectWithValue(result.message || "Invalid user");
    }

    const loggedInUser = {
      employeeId: result.user.employeeId,
      employeeName: result.user.employeeName,
      designation: result.user.designation,
      role: result.user.role,

      // Site name comes from the GET API selected dropdown
      selectedSiteKey,
      selectedSiteName,

      sites: selectedEmployee?.sites || [],
      apiSites: result.user.apiSites || [],
    };

    return {
      user: loggedInUser,
      token: result.token,
    };
  }
);

const initialState = {
  user: getSavedUser(),
  token: getSavedToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      clearAuthFromStorage();
    },

    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        saveAuthToStorage(action.payload.user, action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid user";
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export const selectIsAuthenticated = (state) =>
  Boolean(state.auth.user && state.auth.token);

export default authSlice.reducer;