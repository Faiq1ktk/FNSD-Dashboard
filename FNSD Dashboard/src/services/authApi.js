const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_USER_API = `${API_BASE_URL}/auth/user`;

const REQUEST_TIMEOUT_MS = 8000;

function getMainPayload(data) {
  return data?.user || data?.employee || data?.data || data?.result || data;
}

function getApiMessage(data) {
  return String(data?.message || data?.error || data?.msg || "").trim();
}

function getSiteKey(item, fallbackKey) {
  return String(
    item?.id ||
      item?.siteId ||
      item?.site_id ||
      item?.SiteId ||
      item?.SITE_ID ||
      item?.key ||
      fallbackKey
  );
}

function getSiteValue(item) {
  if (typeof item === "string") return item;

  return (
    item?.site ||
    item?.siteName ||
    item?.site_name ||
    item?.SiteName ||
    item?.SITE_NAME ||
    item?.branch ||
    item?.branchName ||
    item?.location ||
    item?.name ||
    item?.title ||
    ""
  );
}

function cleanSite(site) {
  return {
    key: String(site?.key || "").trim(),
    value: String(site?.value || "").trim(),
  };
}

function removeDuplicateSites(sites) {
  const seen = new Set();

  return sites.filter((site) => {
    const clean = cleanSite(site);
    const uniqueKey = `${clean.key}-${clean.value}`;

    if (!clean.key || !clean.value || seen.has(uniqueKey)) {
      return false;
    }

    seen.add(uniqueKey);
    return true;
  });
}

function collectSitesFromValue(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item, index) => ({
        key: getSiteKey(item, index + 1),
        value: getSiteValue(item),
      }))
      .map(cleanSite)
      .filter((site) => site.key && site.value);
  }

  if (typeof value === "string") {
    return [
      {
        key: "1",
        value,
      },
    ].map(cleanSite);
  }

  if (typeof value === "object") {
    const objectSites = Object.entries(value)
      .map(([key, item]) => {
        if (typeof item === "string") {
          return {
            key,
            value: item,
          };
        }

        return {
          key: getSiteKey(item, key),
          value: getSiteValue(item),
        };
      })
      .map(cleanSite)
      .filter((site) => site.key && site.value);

    if (objectSites.length > 0) {
      return objectSites;
    }
  }

  return [];
}

function extractSites(data) {
  const userData = getMainPayload(data);

  const possibleSiteValues = [
    userData?.sites,
    userData?.site,
    userData?.siteName,
    userData?.site_name,
    userData?.SiteName,
    userData?.SITE_NAME,
    userData?.access,
    userData?.siteAccess,
    userData?.authorizedSites,
    userData?.branches,
    userData?.branch,
    userData?.branchName,
    userData?.location,

    data?.sites,
    data?.site,
    data?.siteName,
    data?.site_name,
    data?.SiteName,
    data?.SITE_NAME,
    data?.access,
    data?.siteAccess,
    data?.authorizedSites,
    data?.branches,
    data?.branch,
    data?.branchName,
    data?.location,
  ];

  const collectedSites = possibleSiteValues.flatMap(collectSitesFromValue);

  return removeDuplicateSites(collectedSites.map(cleanSite));
}

function extractEmployee(data, employeeId) {
  const userData = getMainPayload(data);

  return {
    employeeId:
      userData?.employeeId ||
      userData?.empId ||
      userData?.emp_id ||
      userData?.EmpId ||
      userData?.EMP_ID ||
      userData?.id ||
      userData?.userId ||
      employeeId,

    employeeName:
      userData?.employeeName ||
      userData?.empName ||
      userData?.emp_name ||
      userData?.EmpName ||
      userData?.EMP_NAME ||
      userData?.name ||
      userData?.fullName ||
      userData?.userName ||
      "Employee",

    sites: extractSites(data),
  };
}

function isApiMarkedAsFailed(data) {
  return (
    data?.exists === false ||
    data?.success === false ||
    data?.isFound === false ||
    data?.found === false ||
    data?.status === false
  );
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchEmployeeAccess(employeeId) {
  const url = `${AUTH_USER_API}/${encodeURIComponent(employeeId)}`;

  try {
    // Current GET API: Employee ID goes in URL and API response decides result/message
    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await readJsonSafely(response);
    const apiMessage = getApiMessage(data);

    if (!response.ok) {
      return {
        exists: false,
        message: apiMessage || "Unable to process employee access request",
      };
    }

    if (isApiMarkedAsFailed(data)) {
      return {
        exists: false,
        message: apiMessage || "Unable to process employee access request",
      };
    }

    const employee = extractEmployee(data, employeeId);

    if (!employee.employeeId) {
      return {
        exists: false,
        message: apiMessage || "Unable to process employee access request",
      };
    }

    if (employee.sites.length === 0) {
      return {
        exists: false,
        message: apiMessage || "No site access returned from API",
      };
    }

    return {
      exists: true,
      employee,
      message: apiMessage,
    };
  } catch {
    return {
      exists: false,
      message: "Unable to connect to server",
    };
  }
}