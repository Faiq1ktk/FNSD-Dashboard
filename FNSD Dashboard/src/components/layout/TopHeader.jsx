import { useEffect, useRef, useState } from "react";

import useAuth from "../../hooks/useAuth";

function TopHeader({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const adminDropdownRef = useRef(null);

  const employeeInitial = user?.employeeName
    ? user.employeeName.charAt(0).toUpperCase()
    : "A";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target)
      ) {
        setAdminMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    setAdminMenuOpen(false);
    logout();
  }

  return (
    <header id="top-header">
      <button
        id="toggle-btn"
        type="button"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="header-title">
        <h1>FNSD Dashboard</h1>
      </div>

      <div className="header-right">
        <select className="header-select" defaultValue="Today">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>

        <button type="button" className="live-badge">
          <span className="live-dot"></span>
          <span>Live Data</span>
          <i className="fa-solid fa-chevron-down live-chevron"></i>
        </button>

        <button type="button" className="notif-btn" aria-label="Notifications">
          <i className="fa-solid fa-bell"></i>
          <span className="notif-badge">3</span>
        </button>

        <div className="admin-dropdown-wrap" ref={adminDropdownRef}>
          <button
            type="button"
            className="admin-dropdown-btn"
            onClick={() => setAdminMenuOpen((prev) => !prev)}
          >
            <span className="admin-avatar">{employeeInitial}</span>

            <span className="admin-name-text">
              {user?.employeeName || "Admin"}
            </span>

            <i className="fa-solid fa-chevron-down admin-chevron"></i>
          </button>

          {adminMenuOpen && (
            <div className="admin-custom-menu">
           <div className="admin-menu-user">
  {/* Sequence: Name → Emp ID label only → Designation → Site */}
  <strong>{user?.employeeName || "Admin User"}</strong>
  <span>Emp ID: {user?.employeeId || "N/A"}</span>
  <span>{user?.designation || "N/A"}</span>
  <span>{user?.selectedSiteName || "N/A"}</span>
</div>

              <div className="admin-menu-divider"></div>

              <button
                type="button"
                className="admin-logout-btn"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopHeader;