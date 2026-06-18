// TODO: Backend API Integration
// This static KPI data will later be replaced with real dashboard KPI data from backend APIs.
// Expected API example:
// GET /api/dashboard/kpis?date=2025-05-25&outlet=all&category=all&shift=all&mealType=all
//
// Backend should return:
// totalSales, totalMealCovers, averageOrderValue, grossProfit,
// foodCostPercentage, averageRecipeCost, comparisonPercentage, trendDirection.
//
// This file is currently used only for frontend static/demo data.
// In production, move this data into an API service file such as:
// src/services/dashboardApi.js

export const kpiCards = [
  {
    id: 1,
    label: "TOTAL SALES (TODAY)",
    value: "",
    comparisonLabel: "",
    comparisonValue: "",
    comparisonDirection: "up",
    iconClass: "fa-solid fa-chart-bar",
    bgClass: "bg-kpi-green",
  },
  {
    id: 2,
    label: "TOTAL MEAL COVERS",
    value: "",
    comparisonLabel: "",
    comparisonValue: "",
    comparisonDirection: "up",
    iconClass: "fa-solid fa-users",
    bgClass: "bg-kpi-blue",
  },
  {
    id: 3,
    label: "AVERAGE ORDER VALUE",
    value: "Rs. 159.60",
    comparisonLabel: "vs Yesterday",
    comparisonValue: "6.2%",
    comparisonDirection: "up",
    iconClass: "fa-solid fa-cart-shopping",
    bgClass: "bg-kpi-purple",
  },
  {
    id: 4,
    label: "GROSS PROFIT (TODAY)",
    value: "Rs. 2,45,780",
    subText: "Profit Margin 28.05%",
    iconClass: "fa-solid fa-coins",
    bgClass: "bg-kpi-orange",
  },
  {
    id: 5,
    label: "FOOD COST % (TODAY)",
    value: "31.95%",
    comparisonLabel: "vs Yesterday",
    comparisonValue: "1.8%",
    comparisonDirection: "down",
    iconClass: "fa-solid fa-percent",
    bgClass: "bg-kpi-teal",
  },
  {
    id: 6,
    label: "AVG RECIPE COST (TODAY)",
    value: "Rs. 72.45",
    comparisonLabel: "vs Yesterday",
    comparisonValue: "3.6%",
    comparisonDirection: "up",
    iconClass: "fa-solid fa-receipt",
    bgClass: "bg-kpi-amber",
  },
];