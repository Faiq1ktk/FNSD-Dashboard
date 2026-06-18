import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import dashboardKpiReducer from "../features/dashboard/dashboardKpiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboardKpi: dashboardKpiReducer,
  },
});