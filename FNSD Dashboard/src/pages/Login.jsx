import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { fetchEmployeeAccess } from "../services/authApi";

import logo from "../assets/Loginpage/login-logo.png";
import loginBg from "../assets/Loginpage/login-bg (1).png";

function Login() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const { login, isAuthenticated, loading } = useAuth();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const [checkingEmployee, setCheckingEmployee] = useState(false);
  const [employeeFound, setEmployeeFound] = useState(false);
  const [siteOptions, setSiteOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  function showPopup(message = "Invalid user") {
    setPopupMessage(message);

    setTimeout(() => {
      setPopupMessage("");
    }, 2500);
  }

  function resetEmployeeState() {
    setEmployeeFound(false);
    setSiteOptions([]);
    setSelectedEmployee(null);
    setSelectedSite("");
  }

  async function checkEmployeeAccess(cleanEmployeeId) {
    try {
      setCheckingEmployee(true);

      // GET API checks Employee ID and returns allowed site/access
      const result = await fetchEmployeeAccess(cleanEmployeeId);

      if (!result.exists) {
        showPopup("Invalid user");
        resetEmployeeState();
        return;
      }

      const employee = result.employee;
      const sites = employee.sites || [];

      if (sites.length === 0) {
        showPopup("Invalid user");
        resetEmployeeState();
        return;
      }

      setEmployeeFound(true);
      setSelectedEmployee(employee);
      setSiteOptions(sites);

      // Auto-selects first site returned from GET API
      setSelectedSite(String(sites[0].key));
    } catch (error) {
      showPopup(error.message || "Invalid user");
      resetEmployeeState();
    } finally {
      setCheckingEmployee(false);
    }
  }

  function handleEmployeeIdChange(event) {
    const value = event.target.value;

    setEmployeeId(value);
    resetEmployeeState();

    clearTimeout(timerRef.current);

    const cleanEmployeeId = value.trim();

    if (!cleanEmployeeId || cleanEmployeeId.length < 2) {
      return;
    }

    // Debounce prevents API call on every single key press
    timerRef.current = setTimeout(() => {
      checkEmployeeAccess(cleanEmployeeId);
    }, 700);
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!employeeId.trim()) {
      showPopup("Please enter Emp ID");
      return;
    }

    if (!password.trim()) {
      showPopup("Please enter password");
      return;
    }

    if (!employeeFound || !selectedEmployee) {
      showPopup("Invalid user");
      return;
    }

    if (!selectedSite || siteOptions.length === 0) {
      showPopup("Invalid user");
      return;
    }

    const selectedSiteObject = siteOptions.find(
      (site) => String(site.key) === selectedSite
    );

    if (!selectedSiteObject) {
      showPopup("Invalid user");
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
        showPopup(result.message || "Invalid user");
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      showPopup(error.message || "Invalid user");
    }
  }

  return (
    <main
      className="login-page-exact"
      style={{
        backgroundImage: `url("${loginBg}")`,
      }}
    >
      {popupMessage && (
        <div className="login-top-popup">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{popupMessage}</span>
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