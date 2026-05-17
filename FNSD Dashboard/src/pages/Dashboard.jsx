import DashboardLayout from "../components/layout/DashboardLayout";

import KpiCard from "../components/cards/KpiCard";
import DashboardCard from "../components/cards/DashboardCard";
import AlertItem from "../components/cards/AlertItem";
import CostAlertItem from "../components/cards/CostAlertItem";
import InventorySummary from "../components/cards/InventorySummary";
import ProductionWastage from "../components/cards/ProductionWastage";
import MealShiftCard from "../components/cards/MealShiftCard";

import SalesTrendChart from "../components/charts/SalesTrendChart";
import CategorySalesChart from "../components/charts/CategorySalesChart";
import CostVarianceChart from "../components/charts/CostVarianceChart";
import MealProductionChart from "../components/charts/MealProductionChart";
import OutletRevenueChart from "../components/charts/OutletRevenueChart";

import ProfitableItemsTable from "../components/tables/ProfitableItemsTable";
import RecipeCostTable from "../components/tables/RecipeCostTable";
import OutletSalesTable from "../components/tables/OutletSalesTable";
import TopCostDriversTable from "../components/tables/TopCostDriversTable";
import StaffProductivityTable from "../components/tables/StaffProductivityTable";

import { kpiCards } from "../data/kpiData";
import { notificationAlerts, costAlerts } from "../data/alertData";
import { mealShiftCards } from "../data/mealData";

function Dashboard() {
  return (
    <DashboardLayout>
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

        {kpiCards.map((card) => (
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

            <SalesTrendChart />
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


            <CategorySalesChart />
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

            <CostVarianceChart />
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

            <MealProductionChart />
          </DashboardCard>
        </div>

        <div className="col-xl-4 col-lg-12">
          <DashboardCard
            title="Outlet Revenue Comparison"
            iconClass="fa-solid fa-chart-bar"
            iconColorClass="text-info"
            badge="Today"
          >
            <OutletRevenueChart />
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