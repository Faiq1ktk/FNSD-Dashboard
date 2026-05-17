// TODO: Backend API Integration
// Production and wastage data is currently static.
// Later, connect this section with kitchen production, store issue, and wastage APIs.
//
// Possible backend endpoint:
// GET /api/dashboard/production-wastage?date=2025-05-25
//
// Backend should calculate:
// planned production, actual production, achievement percentage,
// wastage percentage, overproduction meals, estimated cost loss.
//
// Frontend should only display already-calculated values.

export const productionWastage = [
  {
    id: 1,
    label: "Planned Production (Meals)",
    value: "6,500",
    iconClass: "fa-solid fa-calendar-check",
    colorClass: "text-primary",
  },
  {
    id: 2,
    label: "Actual Production (Meals)",
    value: "6,100",
    iconClass: "fa-solid fa-check-circle",
    colorClass: "text-success",
  },
  {
    id: 3,
    label: "Production Achievement",
    value: "93.85%",
    iconClass: "fa-solid fa-star",
    colorClass: "text-warning",
    valueClass: "text-up",
  },
  {
    id: 4,
    label: "Wastage % (Today)",
    value: "6.15%",
    iconClass: "fa-solid fa-trash-can",
    colorClass: "text-danger",
    valueClass: "prod-warn",
  },
  {
    id: 5,
    label: "Overproduction (Meals)",
    value: "400",
    iconClass: "fa-solid fa-plus-circle",
    colorClass: "text-warning",
  },
  {
    id: 6,
    label: "Estimated Cost Loss (Rs. )",
    value: "12,500",
    iconClass: "fa-solid fa-rupee-sign",
    colorClass: "text-danger",
    valueClass: "prod-danger",
  },
];