// TODO: Backend API Integration
// Meal shift card data is currently static.
// Later, this should come from kitchen production and food issuance APIs.
//
// Possible backend endpoint:
// GET /api/dashboard/meal-production-summary?date=2025-05-25
//
// Backend should return meal-wise:
// produced quantity, served quantity, wastage, achievement percentage.
//
// Frontend should use this data to render Breakfast, Lunch, and Dinner cards dynamically.

export const mealShiftCards = [
  {
    id: 1,
    icon: "☀️",
    title: "Breakfast",
    produced: "1,980",
    served: "1,850",
    percentage: "93.43%",
    percentageClass: "text-up",
  },
  {
    id: 2,
    icon: "🍽️",
    title: "Lunch",
    produced: "4,250",
    served: "4,120",
    percentage: "96.94%",
    percentageClass: "text-up",
  },
  {
    id: 3,
    icon: "🌙",
    title: "Dinner",
    produced: "3,200",
    served: "2,980",
    percentage: "93.13%",
    percentageClass: "text-orange",
  },
];