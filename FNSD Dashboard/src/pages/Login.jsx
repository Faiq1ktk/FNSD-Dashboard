import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { fetchEmployeeAccess } from "../services/authApi";

import logo from "../assets/Loginpage/login-logo.png";
import loginBg from "../assets/Loginpage/login-bg (1).png";

const MAX_EMPLOYEE_ID_LENGTH = 8;
const EMPLOYEE_CHECK_DELAY_MS = 700;
const TOAST_HIDE_DELAY_MS = 2600;
const SUCCESS_NAVIGATION_DELAY_MS = 500;

function Login() {
  const navigate = useNavigate();

  const timerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const requestIdRef = useRef(0);

  const { login, isAuthenticated, loading } = useAuth();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const [checkingEmployee, setCheckingEmployee] = useState(false);
  const [employeeFound, setEmployeeFound] = useState(false);
  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "error",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(toastTimerRef.current);
      requestIdRef.current += 1;
    };
  }, []);

  function showToast(message = "Unable to process request", type = "error") {
    clearTimeout(toastTimerRef.current);

    setToast({
      message,
      type,
    });

    toastTimerRef.current = setTimeout(() => {
      setToast({
        message: "",
        type: "error",
      });
    }, TOAST_HIDE_DELAY_MS);
  }

  function getToastIcon(type) {
    if (type === "success") {
      return "fa-solid fa-circle-check";
    }

    if (type === "warning") {
      return "fa-solid fa-triangle-exclamation";
    }

    return "fa-solid fa-circle-exclamation";
  }

  function resetEmployeeState() {
    setEmployeeFound(false);
    setSiteOptions([]);
    setSelectedEmployee(null);
    setSelectedSite("");
  }

  async function checkEmployeeAccess(cleanEmployeeId, requestId) {
    try {
      setCheckingEmployee(true);

      // GET API checks Employee ID and returns allowed site/access or API message
      const result = await fetchEmployeeAccess(cleanEmployeeId);

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!result.exists) {
        showToast(result.message || "Unable to process request", "error");
        resetEmployeeState();
        return;
      }

      const employee = result.employee;
      const sites = employee.sites || [];

      if (sites.length === 0) {
        showToast(result.message || "No site access returned from API", "warning");
        resetEmployeeState();
        return;
      }

      setEmployeeFound(true);
      setSelectedEmployee(employee);
      setSiteOptions(sites);

      // Auto-selects first site returned from GET API
      setSelectedSite(String(sites[0].key));
    } catch {
      if (requestId === requestIdRef.current) {
        showToast("Unable to connect to server", "error");
        resetEmployeeState();
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setCheckingEmployee(false);
      }
    }
  }

  function handleEmployeeIdChange(event) {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, MAX_EMPLOYEE_ID_LENGTH);

    setEmployeeId(value);
    resetEmployeeState();

    requestIdRef.current += 1;
    clearTimeout(timerRef.current);

    const cleanEmployeeId = value.trim();

    if (!cleanEmployeeId) {
      setCheckingEmployee(false);
      return;
    }

    const currentRequestId = requestIdRef.current;

    // Debounce prevents API call on every single key press
    timerRef.current = setTimeout(() => {
      checkEmployeeAccess(cleanEmployeeId, currentRequestId);
    }, EMPLOYEE_CHECK_DELAY_MS);
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!employeeId.trim()) {
      showToast("Please enter Emp ID", "warning");
      return;
    }

    if (!password.trim()) {
      showToast("Please enter password", "warning");
      return;
    }

    if (!employeeFound || !selectedEmployee) {
      showToast("Please enter a valid Employee ID", "warning");
      return;
    }

    if (!selectedSite || siteOptions.length === 0) {
      showToast("No site access returned from API", "warning");
      return;
    }

    const selectedSiteObject = siteOptions.find(
      (site) => String(site.key) === selectedSite
    );

    if (!selectedSiteObject) {
      showToast("No site access returned from API", "warning");
      return;
    }

    try {
      const result = await login({
        employeeId: employeeId.trim(),
        password: password.trim(),
        selectedSiteKey: selectedSiteObject.key,
        selectedSiteName: selectedSiteObject.value,
        selectedEmployee,
      });

      if (!result.success) {
        showToast(result.message || "Unable to login", "error");
        return;
      }

      showToast(result.message || "Login successful", "success");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, SUCCESS_NAVIGATION_DELAY_MS);
    } catch {
      showToast("Unable to connect to server", "error");
    }
  }

  return (
    <main
      className="login-page-exact"
      style={{
        backgroundImage: `url("${loginBg}")`,
      }}
    >
      {toast.message && (
        <div className={`login-top-toast login-top-toast-${toast.type}`}>
          <i className={getToastIcon(toast.type)}></i>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="login-bg-overlay"></div>

      <section className="login-center-wrap">
        <div className="login-card-exact">
          <div className="login-logo-position">
            <img src={logo} alt="Shifa Logo" />
          </div>

          <form className="login-form-exact" onSubmit={handleLogin}>
            <div className="login-field-group">
              <label>
                Emp ID <b>*</b>
              </label>

              <div className="login-input-wrap">
                <input
                  className="login-input-exact"
                  value={employeeId}
                  onChange={handleEmployeeIdChange}
                  maxLength={MAX_EMPLOYEE_ID_LENGTH}
                  inputMode="numeric"
                  autoFocus
                />

                {checkingEmployee && (
                  <span className="login-spinner">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </span>
                )}
              </div>
            </div>

            <div className="login-field-group">
              <label>
                Password <b>*</b>
              </label>

              <input
                type="password"
                className="login-input-exact"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="login-field-group">
              <label>
                Site <b>*</b>
              </label>

              <select
                className="login-input-exact login-select-exact"
                value={selectedSite}
                onChange={(event) => setSelectedSite(event.target.value)}
                disabled={!employeeFound || checkingEmployee}
              >
                {siteOptions.length === 0 && <option value=""></option>}

                {siteOptions.map((site) => (
                  <option key={site.key} value={String(site.key)}>
                    {site.value}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="login-button-exact"
              disabled={checkingEmployee || loading}
            >
              {loading ? (
                <>
                  Logging in <i className="fa-solid fa-spinner fa-spin"></i>
                </>
              ) : (
                <>
                  Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;