const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_USER_API = `${API_BASE_URL}/auth/user`;

function getMainPayload(data) {
  return data?.user || data?.employee || data?.data || data?.result || data;
}

function removeDuplicateSites(sites) {
  const seen = new Set();

  return sites.filter((site) => {
    const uniqueKey = `${site.key}-${site.value}`;

    if (!site.value || seen.has(uniqueKey)) {
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
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            key: String(index + 1),
            value: item,
          };
        }

        return {
          key: String(
            item?.id ||
              item?.siteId ||
              item?.site_id ||
              item?.SiteId ||
              item?.SITE_ID ||
              item?.key ||
              index + 1
          ),
          value:
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
            "",
        };
      })
      .filter((site) => site.value);
  }

  if (typeof value === "string") {
    return [
      {
        key: "1",
        value,
      },
    ];
  }

  if (typeof value === "object") {
    const objectEntries = Object.entries(value);

    // Converts object format like { 1: "Site Name" } into dropdown data
    const objectSites = objectEntries
      .map(([key, item]) => {
        if (typeof item === "string") {
          return {
            key: String(key),
            value: item,
          };
        }

        return {
          key: String(
            item?.id ||
              item?.siteId ||
              item?.site_id ||
              item?.SiteId ||
              item?.SITE_ID ||
              key
          ),
          value:
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
            "",
        };
      })
      .filter((site) => site.value);

    if (objectSites.length > 0) {
      return objectSites;
    }

    return [
      {
        key: String(
          value?.id ||
            value?.siteId ||
            value?.site_id ||
            value?.SiteId ||
            value?.SITE_ID ||
            1
        ),
        value:
          value?.site ||
          value?.siteName ||
          value?.site_name ||
          value?.SiteName ||
          value?.SITE_NAME ||
          value?.branch ||
          value?.branchName ||
          value?.location ||
          value?.name ||
          value?.title ||
          "",
      },
    ].filter((site) => site.value);
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

  return removeDuplicateSites(
    collectedSites.map((site) => ({
      key: String(site.key || "").trim(),
      value: String(site.value || "").trim(),
    }))
  );
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

function isApiNotFound(data) {
  return (
    data?.exists === false ||
    data?.success === false ||
    data?.isFound === false ||
    data?.found === false ||
    data?.status === false ||
    data?.message?.toLowerCase?.().includes("not exist") ||
    data?.message?.toLowerCase?.().includes("not found") ||
    data?.message?.toLowerCase?.().includes("invalid")
  );
}

export async function fetchEmployeeAccess(employeeId) {
  const url = `${AUTH_USER_API}/${encodeURIComponent(employeeId)}`;

  // Current GET API: Employee ID goes in URL and site/access comes back
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404 || response.status === 401) {
    return {
      exists: false,
      message: "Invalid user",
    };
  }

  if (!response.ok) {
    throw new Error("Unable to check employee access");
  }

  const data = await response.json();

  console.log("GET Site API response:", data);

  if (isApiNotFound(data)) {
    return {
      exists: false,
      message: "Invalid user",
    };
  }

  const employee = extractEmployee(data, employeeId);

  console.log("Extracted employee:", employee);
  console.log("API returned sites:", employee.sites);

  if (!employee.employeeId || employee.sites.length === 0) {
    return {
      exists: false,
      message: "Invalid user",
    };
  }

  return {
    exists: true,
    employee,
  };
}