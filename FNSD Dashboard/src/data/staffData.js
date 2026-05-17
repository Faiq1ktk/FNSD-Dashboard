// TODO: Backend API Integration
// Staff productivity data is currently static.
// Later, this data should come from HR, attendance, and production backend modules.
//
// Possible backend endpoint:
// GET /api/dashboard/staff-productivity?date=2025-05-25
//
// Backend should return:
// totalStaff, presentToday, absentToday, shiftWiseProductivity,
// mealsProduced, mealsPerStaff, efficiencyPercentage.
//
// This section can also connect with biometric attendance or HRMS system in future.

export const staffSummary = [
  {
    id: 1,
    label: "Total Staff",
    value: "65",
    bgClass: "staff-blue",
    textClass: "text-primary",
  },
  {
    id: 2,
    label: "Present Today",
    value: "58",
    bgClass: "staff-green",
    textClass: "text-success",
  },
  {
    id: 3,
    label: "Absent Today",
    value: "7",
    bgClass: "staff-red",
    textClass: "text-danger",
  },
];

export const staffProductivity = [
  {
    id: 1,
    shift: "Morning",
    shiftClass: "shift-morning",
    staff: "23",
    mealsProduced: "1,950",
    mealsPerStaff: "84.78",
    efficiency: "92%",
  },
  {
    id: 2,
    shift: "Evening",
    shiftClass: "shift-evening",
    staff: "25",
    mealsProduced: "2,450",
    mealsPerStaff: "98.00",
    efficiency: "95%",
  },
  {
    id: 3,
    shift: "Night",
    shiftClass: "shift-night",
    staff: "10",
    mealsProduced: "1,080",
    mealsPerStaff: "108.00",
    efficiency: "97%",
  },
];

export const staffTotal = {
  shift: "Total",
  staff: "58",
  mealsProduced: "5,480",
  mealsPerStaff: "94.48",
  efficiency: "94%",
};