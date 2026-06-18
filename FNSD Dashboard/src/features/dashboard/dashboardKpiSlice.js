import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { logoutUser } from "../auth/authSlice";
import {
  getTotalMealCoversApi,
  getTotalSalesApi,
} from "../../services/dashboardApi";

const KPI_CACHE_TIME = 5 * 60 * 1000;

function isCacheValid(lastFetchedAt) {
  if (!lastFetchedAt) return false;

  return Date.now() - lastFetchedAt < KPI_CACHE_TIME;
}

function getInitialKpiMetric() {
  return {
    value: "",
    previous: "",
    difference: 0,
    comparisonLabel: "",
    comparisonValue: "",
    comparisonDirection: "up",
  };
}

export const fetchTotalSales = createAsyncThunk(
  "dashboardKpi/fetchTotalSales",
  async ({ date }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("Token not found");
    }

    const result = await getTotalSalesApi({
      date,
      token,
    });

    if (!result.success) {
      return rejectWithValue(result.message || "Unable to load total sales");
    }

    return {
      totalSales: result.totalSales,
      date,
      lastFetchedAt: Date.now(),
    };
  },
  {
    condition: ({ date, force = false }, { getState }) => {
      const dashboardKpi = getState().dashboardKpi;

      if (!dashboardKpi) return true;

      if (dashboardKpi.totalSalesLoading) {
        return false;
      }

      if (force) {
        return true;
      }

      const sameDate = dashboardKpi.totalSalesDate === date;
      const hasValue = Boolean(dashboardKpi.totalSales.value);
      const cacheValid = isCacheValid(dashboardKpi.totalSalesLastFetchedAt);

      return !(sameDate && hasValue && cacheValid);
    },
  }
);

export const fetchTotalMealCovers = createAsyncThunk(
  "dashboardKpi/fetchTotalMealCovers",
  async ({ date }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("Token not found");
    }

    const result = await getTotalMealCoversApi({
      date,
      token,
    });

    if (!result.success) {
      return rejectWithValue(result.message || "Unable to load meal covers");
    }

    return {
      totalMealCovers: result.totalMealCovers,
      date,
      lastFetchedAt: Date.now(),
    };
  },
  {
    condition: ({ date, force = false }, { getState }) => {
      const dashboardKpi = getState().dashboardKpi;

      if (!dashboardKpi) return true;

      if (dashboardKpi.totalMealCoversLoading) {
        return false;
      }

      if (force) {
        return true;
      }

      const sameDate = dashboardKpi.totalMealCoversDate === date;
      const hasValue = Boolean(dashboardKpi.totalMealCovers.value);
      const cacheValid = isCacheValid(
        dashboardKpi.totalMealCoversLastFetchedAt
      );

      return !(sameDate && hasValue && cacheValid);
    },
  }
);

const initialState = {
  totalSales: getInitialKpiMetric(),
  totalSalesDate: "",
  totalSalesLoading: false,
  totalSalesError: null,
  totalSalesLastFetchedAt: null,

  totalMealCovers: getInitialKpiMetric(),
  totalMealCoversDate: "",
  totalMealCoversLoading: false,
  totalMealCoversError: null,
  totalMealCoversLastFetchedAt: null,
};

const dashboardKpiSlice = createSlice({
  name: "dashboardKpi",
  initialState,

  reducers: {
    clearTotalSalesError(state) {
      state.totalSalesError = null;
    },

    clearTotalMealCoversError(state) {
      state.totalMealCoversError = null;
    },

    resetDashboardKpis(state) {
      state.totalSales = getInitialKpiMetric();
      state.totalSalesDate = "";
      state.totalSalesLoading = false;
      state.totalSalesError = null;
      state.totalSalesLastFetchedAt = null;

      state.totalMealCovers = getInitialKpiMetric();
      state.totalMealCoversDate = "";
      state.totalMealCoversLoading = false;
      state.totalMealCoversError = null;
      state.totalMealCoversLastFetchedAt = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalSales.pending, (state) => {
        state.totalSalesLoading = true;
        state.totalSalesError = null;
      })

      .addCase(fetchTotalSales.fulfilled, (state, action) => {
        state.totalSalesLoading = false;
        state.totalSales = action.payload.totalSales;
        state.totalSalesDate = action.payload.date;
        state.totalSalesLastFetchedAt = action.payload.lastFetchedAt;
        state.totalSalesError = null;
      })

      .addCase(fetchTotalSales.rejected, (state, action) => {
        state.totalSalesLoading = false;
        state.totalSalesError =
          action.payload || "Unable to load total sales";
      })

      .addCase(fetchTotalMealCovers.pending, (state) => {
        state.totalMealCoversLoading = true;
        state.totalMealCoversError = null;
      })

      .addCase(fetchTotalMealCovers.fulfilled, (state, action) => {
        state.totalMealCoversLoading = false;
        state.totalMealCovers = action.payload.totalMealCovers;
        state.totalMealCoversDate = action.payload.date;
        state.totalMealCoversLastFetchedAt = action.payload.lastFetchedAt;
        state.totalMealCoversError = null;
      })

      .addCase(fetchTotalMealCovers.rejected, (state, action) => {
        state.totalMealCoversLoading = false;
        state.totalMealCoversError =
          action.payload || "Unable to load meal covers";
      })

      .addCase(logoutUser, (state) => {
        state.totalSales = getInitialKpiMetric();
        state.totalSalesDate = "";
        state.totalSalesLoading = false;
        state.totalSalesError = null;
        state.totalSalesLastFetchedAt = null;

        state.totalMealCovers = getInitialKpiMetric();
        state.totalMealCoversDate = "";
        state.totalMealCoversLoading = false;
        state.totalMealCoversError = null;
        state.totalMealCoversLastFetchedAt = null;
      });
  },
});

export const {
  clearTotalMealCoversError,
  clearTotalSalesError,
  resetDashboardKpis,
} = dashboardKpiSlice.actions;

export const selectTotalSales = (state) => state.dashboardKpi.totalSales;

export const selectTotalSalesLoading = (state) =>
  state.dashboardKpi.totalSalesLoading;

export const selectTotalSalesError = (state) =>
  state.dashboardKpi.totalSalesError;

export const selectTotalMealCovers = (state) =>
  state.dashboardKpi.totalMealCovers;

export const selectTotalMealCoversLoading = (state) =>
  state.dashboardKpi.totalMealCoversLoading;

export const selectTotalMealCoversError = (state) =>
  state.dashboardKpi.totalMealCoversError;

export default dashboardKpiSlice.reducer;