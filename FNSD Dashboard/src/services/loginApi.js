const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_API = `${API_BASE_URL}/auth/login`;

async function getResponseData(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function loginEmployeeApi({ employeeId, selectedSiteKey }) {
  const payload = {
    emp_id: employeeId,
    sites: [Number(selectedSiteKey)],
  };

  // POST Login API sends Employee ID and selected site ID to backend
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

  if (
    data?.status === "error" ||
    data?.success === false ||
    data?.status === false ||
    data?.message?.toLowerCase?.().includes("invalid")
  ) {
    return {
      success: false,
      message: data?.message || "Invalid user",
    };
  }

  const userData = data?.data?.user || data?.user || {};
  const token = data?.data?.token || data?.token || data?.accessToken || data?.jwt;

  return {
    success: true,
    token: token || "active-session",
    user: {
      employeeId: userData?.id || userData?.emp_id || employeeId,
      employeeName: userData?.name || userData?.employeeName || "Employee",
      designation: userData?.job_title || userData?.designation || "N/A",
      role: userData?.role || "",
      apiSites: userData?.site || [],
    },
    rawData: data,
  };
}