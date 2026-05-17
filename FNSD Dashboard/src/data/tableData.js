
// TODO: Backend API Integration
// This file contains static table data for dashboard sections.
// In production, this data should come from backend APIs.
//
// Possible backend endpoints:
// GET /api/dashboard/profitable-items
// GET /api/dashboard/recipe-cost-snapshot
// GET /api/dashboard/outlet-sales
// GET /api/dashboard/top-cost-drivers
//
// Filters to pass:
// selectedDate, outletId, categoryId, shiftId, mealType.
//
// Backend should return clean, formatted, validated table rows.
// Frontend should only render the data and should not perform heavy calculations here.

export const profitableItems = [
  { id: 1, itemName: "Masala Dosa", qty: "842", revenue: "1,26,300", profit: "61,450", margin: "48.7%" },
  { id: 2, itemName: "Veg Biryani", qty: "655", revenue: "1,05,920", profit: "50,340", margin: "47.6%" },
  { id: 3, itemName: "Mini Meals", qty: "620", revenue: "93,000", profit: "38,290", margin: "41.2%" },
  { id: 4, itemName: "Idli Sambar", qty: "580", revenue: "69,600", profit: "27,820", margin: "40.0%" },
  { id: 5, itemName: "Tea", qty: "1,250", revenue: "56,250", profit: "21,500", margin: "38.2%" },
  { id: 6, itemName: "Chapati Meals", qty: "470", revenue: "54,050", profit: "20,310", margin: "37.6%" },
  { id: 7, itemName: "Veg Fried Rice", qty: "410", revenue: "49,200", profit: "18,220", margin: "37.1%" },
  { id: 8, itemName: "Paneer Butter Masala", qty: "320", revenue: "48,000", profit: "17,680", margin: "36.8%" },
  { id: 9, itemName: "Lemon Rice", qty: "380", revenue: "43,200", profit: "15,540", margin: "36.0%" },
  { id: 10, itemName: "Filter Coffee", qty: "620", revenue: "37,200", profit: "13,520", margin: "36.3%" },
];

export const recipeCostSnapshot = [
  { id: 1, itemName: "Masala Dosa", stdCost: "65.00", actualCost: "72.00", varianceRs: "7.00", variancePercent: "10.77%", status: "High", statusType: "high", varianceType: "down" },
  { id: 2, itemName: "Veg Biryani", stdCost: "90.00", actualCost: "88.00", varianceRs: "-2.00", variancePercent: "-2.22%", status: "OK", statusType: "ok", varianceType: "up" },
  { id: 3, itemName: "Mini Meals", stdCost: "85.00", actualCost: "86.00", varianceRs: "1.00", variancePercent: "1.18%", status: "Slight High", statusType: "slight", varianceType: "down" },
  { id: 4, itemName: "Idli Sambar", stdCost: "40.00", actualCost: "39.00", varianceRs: "-1.00", variancePercent: "-2.50%", status: "OK", statusType: "ok", varianceType: "up" },
  { id: 5, itemName: "Tea", stdCost: "8.00", actualCost: "10.00", varianceRs: "2.00", variancePercent: "25.00%", status: "High", statusType: "high", varianceType: "down" },
];

export const outletSales = [
  {
    id: 1,
    outlet: "Main Cafeteria",
    breakfastCovers: "320",
    breakfastRevenue: "48,600",
    lunchCovers: "1,250",
    lunchRevenue: "2,25,000",
    dinnerCovers: "910",
    dinnerRevenue: "1,62,000",
    totalCovers: "2,480",
    totalRevenue: "4,35,600",
  },
  {
    id: 2,
    outlet: "Staff Cafeteria",
    breakfastCovers: "180",
    breakfastRevenue: "21,600",
    lunchCovers: "650",
    lunchRevenue: "1,04,000",
    dinnerCovers: "420",
    dinnerRevenue: "71,400",
    totalCovers: "1,250",
    totalRevenue: "1,97,000",
  },
  {
    id: 3,
    outlet: "OPD Cafeteria",
    breakfastCovers: "120",
    breakfastRevenue: "14,400",
    lunchCovers: "420",
    lunchRevenue: "67,200",
    dinnerCovers: "300",
    dinnerRevenue: "48,000",
    totalCovers: "840",
    totalRevenue: "1,29,600",
  },
  {
    id: 4,
    outlet: "Tuck Shop",
    breakfastCovers: "210",
    breakfastRevenue: "10,500",
    lunchCovers: "–",
    lunchRevenue: "–",
    dinnerCovers: "–",
    dinnerRevenue: "–",
    totalCovers: "210",
    totalRevenue: "10,500",
  },
];

export const outletSalesTotal = {
  outlet: "Total",
  breakfastCovers: "830",
  breakfastRevenue: "95,100",
  lunchCovers: "2,320",
  lunchRevenue: "3,96,200",
  dinnerCovers: "1,630",
  dinnerRevenue: "2,81,400",
  totalCovers: "4,780",
  totalRevenue: "6,72,700",
};

export const topCostDrivers = [
  { id: 1, ingredient: "Cooking Oil", costImpact: "45,200", trend: "up" },
  { id: 2, ingredient: "Basmati Rice", costImpact: "38,750", trend: "up" },
  { id: 3, ingredient: "Chicken", costImpact: "32,600", trend: "flat" },
  { id: 4, ingredient: "Ghee", costImpact: "18,900", trend: "up" },
  { id: 5, ingredient: "Vegetables", costImpact: "14,800", trend: "down" },
];