// TODO: Backend API Integration
// Alert, cost alert, and inventory summary data is currently static.
// Later, these values should come from backend inventory, stock, expiry, and costing APIs.
//
// Possible backend endpoints:
// GET /api/dashboard/alerts
// GET /api/dashboard/cost-alerts
// GET /api/dashboard/inventory-summary
//
// Backend should calculate:
// near expiry items, low stock items, out of stock items,
// high consumption items, cost threshold alerts, dead stock value.
//
// Frontend should only map backend response to cards/alert components.

export const notificationAlerts = [
  {
    id: 1,
    title: "Inventory Alerts",
    subtitle: "12 Items Near Expiry",
    iconClass: "fa-solid fa-triangle-exclamation",
    type: "warn",
  },
  {
    id: 2,
    title: "Low Stock Alerts",
    subtitle: "18 Items Low Stock",
    iconClass: "fa-solid fa-box-open",
    type: "info",
  },
  {
    id: 3,
    title: "Out of Stock Items",
    subtitle: "7 Items Out of Stock",
    iconClass: "fa-solid fa-circle-xmark",
    type: "danger",
  },
  {
    id: 4,
    title: "High Consumptions",
    subtitle: "15 Items High Usage",
    iconClass: "fa-solid fa-fire-flame-curved",
    type: "success",
  },
];

export const costAlerts = [
  {
    id: 1,
    title: "3 Items Exceeding",
    subtitle: "Standard Cost",
    dotClass: "dot-red",
    bgClass: "cost-alert-red",
  },
  {
    id: 2,
    title: "5 Items Near",
    subtitle: "Cost Threshold",
    dotClass: "dot-orange",
    bgClass: "cost-alert-yellow",
  },
  {
    id: 3,
    title: "Cost Under Control",
    subtitle: "Remaining items OK",
    dotClass: "dot-green",
    bgClass: "cost-alert-green",
    titleClass: "text-success-strong",
  },
];

export const inventorySummary = [
  {
    id: 1,
    label: "Total Inventory Value",
    value: "Rs. 18,75,500",
    iconClass: "fa-solid fa-boxes-stacked",
    colorClass: "text-primary",
  },
  {
    id: 2,
    label: "Near Expiry (Value)",
    value: "Rs. 2,45,000",
    iconClass: "fa-solid fa-hourglass-half",
    colorClass: "text-warning",
  },
  {
    id: 3,
    label: "Low Stock (Value)",
    value: "Rs. 1,20,300",
    iconClass: "fa-solid fa-chart-bar",
    colorClass: "text-danger",
  },
  {
    id: 4,
    label: "Out of Stock (Items)",
    value: "7 Items",
    iconClass: "fa-solid fa-circle-xmark",
    colorClass: "text-danger",
  },
  {
    id: 5,
    label: "Dead Stock Value",
    value: "Rs. 35,600",
    iconClass: "fa-solid fa-ban",
    colorClass: "text-secondary",
  },
];