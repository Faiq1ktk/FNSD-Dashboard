const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const GET_REVENUE_API = `${API_BASE_URL}/dashboard/getRev`;
const GET_MEAL_COVERS_API = `${API_BASE_URL}/dashboard/getMealCovered`;

async function getResponseData(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function formatRupees(value) {
  if (value === null || value === undefined || value === "") {
    return "Rs. 0";
  }

  const numberValue = Number(String(value).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(numberValue)) {
    return "Rs. 0";
  }

  return `Rs. ${numberValue.toLocaleString("en-IN")}`;
}

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const numberValue = Number(String(value).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(numberValue)) {
    return "0";
  }

  return numberValue.toLocaleString("en-IN");
}

function formatPercentage(value) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return "0%";
  }

  return `${Math.abs(numberValue).toFixed(2)}%`;
}

function getTrendDirection(value) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return "up";
  }

  return numberValue < 0 ? "down" : "up";
}

function extractTotalRevenue(data) {
  return data?.data?.totalRevenue || {};
}

function extractMealCovers(data) {
  const payload = data?.data || data || {};

  return (
    payload?.totalMealCovers ||
    payload?.totalMealCovered ||
    payload?.mealCovers ||
    payload?.mealCovered ||
    payload?.totalMeals ||
    payload?.coveredMeals ||
    payload?.covers ||
    payload
  );
}

function normalizeMealCoversResponse(data) {
  const mealCovers = extractMealCovers(data);

  const current =
    mealCovers?.current ??
    mealCovers?.total ??
    mealCovers?.value ??
    mealCovers?.count ??
    mealCovers?.mealCovers ??
    mealCovers?.mealCovered ??
    0;

  const previous =
    mealCovers?.previous ??
    mealCovers?.previousValue ??
    mealCovers?.previousCount ??
    0;

  const difference =
    mealCovers?.difference ??
    mealCovers?.diff ??
    Number(current || 0) - Number(previous || 0);

  const percentageChange =
    mealCovers?.percentageChange ??
    mealCovers?.percentChange ??
    mealCovers?.changePercentage ??
    mealCovers?.percentage ??
    0;

  return {
    value: formatNumber(current),
    previous: formatNumber(previous),
    difference,
    comparisonLabel: "vs Previous",
    comparisonValue: formatPercentage(percentageChange),
    comparisonDirection: getTrendDirection(percentageChange),
  };
}

export async function getTotalSalesApi({ date, token }) {
  if (!token) {
    return {
      success: false,
      statusCode: 401,
      message: "Token not found",
    };
  }

  const params = new URLSearchParams({
    date,
  });

  // GET Revenue API: date goes as query param, token goes as Bearer header
  const response = await fetch(`${GET_REVENUE_API}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await getResponseData(response);

  if (response.status === 401) {
    return {
      success: false,
      statusCode: 401,
      message: data?.message || "Unauthorized. Please login again.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status,
      message: data?.message || "Unable to load total sales",
    };
  }

  const totalRevenue = extractTotalRevenue(data);

  return {
    success: true,
    totalSales: {
      value: formatRupees(totalRevenue.current),
      previous: formatRupees(totalRevenue.previous),
      difference: totalRevenue.difference || 0,
      comparisonLabel: "vs Previous",
      comparisonValue: formatPercentage(totalRevenue.percentageChange),
      comparisonDirection: getTrendDirection(totalRevenue.percentageChange),
    },
    rawData: data,
  };
}

export async function getTotalMealCoversApi({ date, token }) {
  if (!token) {
    return {
      success: false,
      statusCode: 401,
      message: "Token not found",
    };
  }

  const params = new URLSearchParams({
    date,
  });

  // GET Meal Covers API: date goes as query param, token goes as Bearer header
  const response = await fetch(`${GET_MEAL_COVERS_API}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await getResponseData(response);

  if (response.status === 401) {
    return {
      success: false,
      statusCode: 401,
      message: data?.message || "Unauthorized. Please login again.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status,
      message: data?.message || "Unable to load meal covers",
    };
  }

  return {
    success: true,
    totalMealCovers: normalizeMealCoversResponse(data),
    rawData: data,
  };
}