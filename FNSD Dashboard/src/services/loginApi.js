const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_API = `${API_BASE_URL}/auth/login`;

async function getResponseData(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isLoginInvalid(data) {
  const message = data?.message?.toLowerCase?.() || "";

  return (
    data?.status === "error" ||
    data?.success === false ||
    data?.status === false ||
    message.includes("invalid")
  );
}

function extractLoginUser(data, employeeId) {
  const userData = data?.data?.user || data?.user || {};

  return {
    employeeId: userData?.id || userData?.emp_id || employeeId,
    employeeName: userData?.name || userData?.employeeName || "Employee",
    designation: userData?.job_title || userData?.designation || "N/A",
    role: userData?.role || "",
    apiSites: userData?.site || [],
  };
}

function extractLoginToken(data) {
  return data?.data?.token || data?.token || data?.accessToken || data?.jwt;
}

export async function loginEmployeeApi({
  employeeId,
  password,
  selectedSiteKey,
}) {
  const payload = {
    emp_id: employeeId,
    password, // Add password here / update key later if backend requires different name
    sites: [Number(selectedSiteKey)],
  };

  // POST Login API sends Employee ID, password, and selected site ID to backend
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await getResponseData(response);

  if (response.status === 404 || response.status === 401) {
    return {
      success: false,
      message: "Invalid user",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: data?.message || "Login failed",
    };
  }

  if (isLoginInvalid(data)) {
    return {
      success: false,
      message: data?.message || "Invalid user",
    };
  }

  return {
    success: true,
    token: extractLoginToken(data) || "active-session",
    user: extractLoginUser(data, employeeId),
    rawData: data,
  };
}