import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";

import KpiCard from "../components/cards/KpiCard";
import DashboardCard from "../components/cards/DashboardCard";
import AlertItem from "../components/cards/AlertItem";
import CostAlertItem from "../components/cards/CostAlertItem";
import InventorySummary from "../components/cards/InventorySummary";
import ProductionWastage from "../components/cards/ProductionWastage";
import MealShiftCard from "../components/cards/MealShiftCard";

import ProfitableItemsTable from "../components/tables/ProfitableItemsTable";
import RecipeCostTable from "../components/tables/RecipeCostTable";
import OutletSalesTable from "../components/tables/OutletSalesTable";
import TopCostDriversTable from "../components/tables/TopCostDriversTable";
import StaffProductivityTable from "../components/tables/StaffProductivityTable";

import { kpiCards } from "../data/kpiData";
import { notificationAlerts, costAlerts } from "../data/alertData";
import { mealShiftCards } from "../data/mealData";

import { selectAuthToken } from "../features/auth/authSlice";

import {
  fetchTotalMealCovers,
  fetchTotalSales,
  selectTotalMealCovers,
  selectTotalMealCoversError,
  selectTotalMealCoversLoading,
  selectTotalSales,
  selectTotalSalesError,
  selectTotalSalesLoading,
} from "../features/dashboard/dashboardKpiSlice";

const SalesTrendChart = lazy(() =>
  import("../components/charts/SalesTrendChart")
);

const CategorySalesChart = lazy(() =>
  import("../components/charts/CategorySalesChart")
);

const CostVarianceChart = lazy(() =>
  import("../components/charts/CostVarianceChart")
);

const MealProductionChart = lazy(() =>
  import("../components/charts/MealProductionChart")
);

const OutletRevenueChart = lazy(() =>
  import("../components/charts/OutletRevenueChart")
);

const DEFAULT_FILTER_DATE = "2025-06-01";

function formatDateForApi(dateValue) {
  if (!dateValue) return "";

  const parts = dateValue.split("-");

  if (parts.length !== 3) {
    return dateValue;
  }

  const [year, month, day] = parts;

  return `${day}-${month}-${year}`;
}

function ChartFallback() {
  return <div className="chart-wrap">Loading chart...</div>;
}

function Dashboard() {
  const dispatch = useDispatch();

  const token = useSelector(selectAuthToken);

  const totalSales = useSelector(selectTotalSales);
  const totalSalesLoading = useSelector(selectTotalSalesLoading);
  const totalSalesError = useSelector(selectTotalSalesError);

  const totalMealCovers = useSelector(selectTotalMealCovers);
  const totalMealCoversLoading = useSelector(selectTotalMealCoversLoading);
  const totalMealCoversError = useSelector(selectTotalMealCoversError);

  const [selectedDate, setSelectedDate] = useState(DEFAULT_FILTER_DATE);

  const firstLoadDoneRef = useRef(false);

  const loadDashboardKpis = useCallback(
    ({ dateValue = selectedDate, force = false } = {}) => {
      if (!token || !dateValue) return;

      const apiDate = formatDateForApi(dateValue);

      // For now, two KPI APIs are integrated.
      // Future KPI APIs will be dispatched from this same function.
      dispatch(fetchTotalSales({ date: apiDate, force }));
      dispatch(fetchTotalMealCovers({ date: apiDate, force }));
    },
    [dispatch, selectedDate, token]
  );

  useEffect(() => {
    if (!token || firstLoadDoneRef.current) return;

    firstLoadDoneRef.current = true;

    // Initial dashboard load only. Date change will NOT call API.
    loadDashboardKpis({
      dateValue: DEFAULT_FILTER_DATE,
    });
  }, [loadDashboardKpis, token]);

  const handleDateChange = useCallback((dateValue) => {
    // Only update selected date. Do not call API here.
    setSelectedDate(dateValue);
  }, []);

  const handleApplyFilters = useCallback(() => {
    // API calls happen only when Apply button is clicked.
    loadDashboardKpis({
      force: true,
    });
  }, [loadDashboardKpis]);

  const applyingFilters = totalSalesLoading || totalMealCoversLoading;

  const dashboardKpiCards = useMemo(() => {
    return kpiCards.map((card) => {
      if (card.id === 1) {
        return {
          ...card,
          value: totalSalesError ? "—" : totalSales.value,
          comparisonLabel: totalSales.comparisonLabel,
          comparisonValue: totalSales.comparisonValue,
          comparisonDirection: totalSales.comparisonDirection,
          loading: totalSalesLoading,
        };
      }

      if (card.id === 2) {
        return {
          ...card,
          value: totalMealCoversError ? "—" : totalMealCovers.value,
          comparisonLabel: totalMealCovers.comparisonLabel,
          comparisonValue: totalMealCovers.comparisonValue,
          comparisonDirection: totalMealCovers.comparisonDirection,
          loading: totalMealCoversLoading,
        };
      }

      return card;
    });
  }, [
    totalMealCovers,
    totalMealCoversError,
    totalMealCoversLoading,
    totalSales,
    totalSalesError,
    totalSalesLoading,
  ]);

  return (
    <DashboardLayout
      filterBarProps={{
        selectedDate,
        onDateChange: handleDateChange,
        onApplyFilters: handleApplyFilters,
        applyingFilters,
      }}
    >
      {/* 
  TODO: Backend Dashboard Data Loading
  In production, this page should fetch all dashboard data from backend APIs.
  Recommended approach:
  1. Store selected filters in React state.
  2. Call API service functions inside useEffect.
  3. Pass API response data into reusable components.
  4. Show loading state while data is being fetched.
  5. Show error state if API fails.

  Suggested service file:
  src/services/dashboardApi.js
*/}

      <div className="row g-2 section-gap">
        {/* 
  TODO: Replace kpiCards static array with backend KPI response.
  Keep KpiCard component reusable.
  Only change data source, not UI structure.
*/}

        {dashboardKpiCards.map((card) => (
          <div key={card.id} className="col-xl-2 col-lg-4 col-md-6 col-sm-6">
            <KpiCard card={card} />
          </div>
        ))}
      </div>

      <div className="row g-2 section-gap">
        <div className="col-xl-3 col-lg-6">
          <DashboardCard
            title="Sales Trend"
            iconClass="fa-solid fa-chart-line"
            iconColorClass="text-primary"
            badge="Daily"
          >
            {/* 
  TODO: Pass backend sales trend data here.
  Future example:
  <SalesTrendChart data={dashboardData.salesTrend} />
*/}

            <Suspense fallback={<ChartFallback />}>
              <SalesTrendChart />
            </Suspense>
          </DashboardCard>
        </div>

        <div className="col-xl-3 col-lg-6">
          <DashboardCard
            title="Category Wise Sales Distribution"
            iconClass="fa-solid fa-chart-pie"
            iconColorClass="text-warning"
          >
            {/* 
  TODO: Pass backend category-wise sales data here.
  Future example:
  <CategorySalesChart data={dashboardData.categorySales} />
*/}

            <Suspense fallback={<ChartFallback />}>
              <CategorySalesChart />
            </Suspense>
          </DashboardCard>
        </div>

        <div className="col-xl-4 col-lg-8">
          <DashboardCard
            title="Top 10 Profitable Items"
            iconClass="fa-solid fa-trophy"
            iconColorClass="text-warning"
            badge="Today"
            bodyClassName="p-0"
          >
            {/* 
  TODO: Pass backend top profitable items data here.
  Future example:
  <ProfitableItemsTable items={dashboardData.profitableItems} />
*/}

            <ProfitableItemsTable />
          </DashboardCard>
        </div>

        <div className="col-xl-2 col-lg-4">
          <DashboardCard
            title="Alerts & Notifications"
            iconClass="fa-solid fa-bell"
            iconColorClass="text-warning"
          >
            {/* 
  TODO: Replace notificationAlerts static array with backend alerts response.
  Future example:
  dashboardData.alerts.map(...)
*/}

            {notificationAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </DashboardCard>
        </div>
      </div>

      <div className="row g-2 section-gap">
        <div className="col-xl-3 col-lg-6">
          <DashboardCard
            title="Recipe Cost Snapshot"
            iconClass="fa-solid fa-clipboard-list"
            iconColorClass="text-info"
            badge="Today"
            bodyClassName="p-0"
          >
            <RecipeCostTable />
          </DashboardCard>
        </div>

        <div className="col-xl-5 col-lg-6">
          <DashboardCard
            title="Actual vs Standard Cost"
            iconClass="fa-solid fa-chart-column"
            iconColorClass="text-primary"
            badge="Variance %"
          >
            {/* 
  TODO: Pass backend standard vs actual cost variance data here.
  Future example:
  <CostVarianceChart data={dashboardData.costVariance} />
*/}

            <Suspense fallback={<ChartFallback />}>
              <CostVarianceChart />
            </Suspense>
          </DashboardCard>
        </div>

        <div className="col-xl-2 col-lg-6">
          <DashboardCard
            title="Cost Alerts"
            iconClass="fa-solid fa-circle-exclamation"
            iconColorClass="text-danger"
            badge="Today"
          >
            {costAlerts.map((item) => (
              <CostAlertItem key={item.id} item={item} />
            ))}
          </DashboardCard>
        </div>

        <div className="col-xl-2 col-lg-6">
          <DashboardCard
            title="Inventory Summary"
            iconClass="fa-solid fa-warehouse"
            iconColorClass="text-secondary"
          >
            <InventorySummary />
          </DashboardCard>
        </div>
      </div>

      <div className="row g-2 section-gap">
        <div className="col-xl-6 col-lg-7">
          <DashboardCard
            title="Cafeteria Outlet Wise Sales"
            iconClass="fa-solid fa-store"
            iconColorClass="text-success"
            badge="Today"
            bodyClassName="p-0"
          >
            <OutletSalesTable />
          </DashboardCard>
        </div>

        <div className="col-xl-3 col-lg-5">
          <DashboardCard
            title="Production & Wastage"
            iconClass="fa-solid fa-industry"
            iconColorClass="text-primary"
            badge="Today"
          >
            <ProductionWastage />
          </DashboardCard>
        </div>

        <div className="col-xl-3 col-lg-6">
          <DashboardCard
            title="Top Cost Drivers"
            iconClass="fa-solid fa-ranking-star"
            iconColorClass="text-danger"
            badge="This Month"
          >
            <TopCostDriversTable />
          </DashboardCard>
        </div>
      </div>

      <div className="row g-2 section-gap">
        <div className="col-xl-4 col-lg-6">
          <DashboardCard
            title="Staff Productivity"
            iconClass="fa-solid fa-users-gear"
            iconColorClass="text-success"
            badge="Today"
          >
            <StaffProductivityTable />
          </DashboardCard>
        </div>

        <div className="col-xl-4 col-lg-6">
          <DashboardCard
            title="Daily Production Volume"
            iconClass="fa-solid fa-bowl-food"
            iconColorClass="text-warning"
            badge="Meal Wise"
          >
            <div className="meal-shift-grid">
              {mealShiftCards.map((meal) => (
                <MealShiftCard key={meal.id} meal={meal} />
              ))}
            </div>

            <Suspense fallback={<ChartFallback />}>
              <MealProductionChart />
            </Suspense>
          </DashboardCard>
        </div>

        <div className="col-xl-4 col-lg-12">
          <DashboardCard
            title="Outlet Revenue Comparison"
            iconClass="fa-solid fa-chart-bar"
            iconColorClass="text-info"
            badge="Today"
          >
            <Suspense fallback={<ChartFallback />}>
              <OutletRevenueChart />
            </Suspense>
          </DashboardCard>
        </div>
      </div>

      {/* 
  TODO: Footer Live Status
  Footer note and Live Data status should later reflect backend refresh status.
  Example:
  lastUpdatedAt, isLiveConnected, selectedDateSummary
*/}

      <div className="dashboard-footer">
        <span>All data shown above is as per selected date.</span>

        <div className="footer-live-badge">
          <span className="live-dot"></span>
          Live Data
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;