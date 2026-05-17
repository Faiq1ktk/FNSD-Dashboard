// TODO: Backend API Integration
// Chart data is currently static and used only for frontend UI rendering.
// Later, this file should be replaced by API-driven data.
//
// Possible backend endpoints:
// GET /api/dashboard/sales-trend
// GET /api/dashboard/category-sales-distribution
// GET /api/dashboard/cost-variance
// GET /api/dashboard/meal-production
// GET /api/dashboard/outlet-revenue-comparison
//
// Each endpoint should accept filters such as:
// date, outletId, categoryId, shiftId, mealType.
//
// Important:
// Chart.js components should receive dynamic labels and values from backend response.
// Keep the frontend chart component reusable and only replace the data source.


export const salesTrendData = {
  labels: ["19 May", "20 May", "21 May", "22 May", "23 May", "24 May", "25 May"],
  values: [620000, 710000, 580000, 490000, 640000, 780000, 875340],
};

export const categorySalesData = {
  labels: [
    "South Indian",
    "North Indian",
    "Chinese",
    "Beverages",
    "Snacks",
    "Desserts",
    "Others",
  ],
  values: [28.5, 22.6, 15.3, 10.5, 9.8, 6.2, 4.0],
  colors: [
    "#1565c0",
    "#2e7d32",
    "#e53935",
    "#f57c00",
    "#7b1fa2",
    "#00838f",
    "#9e9e9e",
  ],
};

export const costVarianceData = {
  labels: ["Masala Dosa", "Veg Biryani", "Mini Meals", "Idli Sambar", "Tea"],
  standardCost: [65, 90, 85, 40, 8],
  actualCost: [72, 88, 86, 39, 10],
  variancePercent: [10.77, -2.22, 1.18, -2.5, 25],
};

export const mealProductionChartData = {
  labels: ["Breakfast", "Lunch", "Dinner"],
  produced: [1980, 4250, 3200],
  served: [1850, 4120, 2980],
};

export const outletRevenueChartData = {
  labels: ["Main Cafeteria", "Staff Cafeteria", "OPD Cafeteria", "Tuck Shop"],
  breakfast: [48600, 21600, 14400, 10500],
  lunch: [225000, 104000, 67200, 0],
  dinner: [162000, 71400, 48000, 0],
};