function TopHeader({ onToggleSidebar }) {
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

         {/* 
  TODO: Date Range Filter Integration
  This dropdown will later control global dashboard time range:
  Today, Yesterday, This Week, This Month.
  Changing this value should refresh all dashboard APIs.
*/} 


        <select className="header-select" defaultValue="Today">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
               
        {/* 
  TODO: Live Data Integration
  This badge should later reflect real backend/live connection status.
  Possible future options:
  - WebSocket connected/disconnected
  - API polling enabled/disabled
  - Last successful refresh status
*/}  

        <button type="button" className="live-badge">
          <span className="live-dot"></span>
          <span>Live Data</span>
          <i className="fa-solid fa-chevron-down live-chevron"></i>
        </button>
        
        {/* 
  TODO: Notification API Integration
  Notification count should later come from backend alerts API.
  Example:
  GET /api/dashboard/notifications/unread-count
*/} 
        <button type="button" className="notif-btn" aria-label="Notifications">
          <i className="fa-solid fa-bell"></i>
          <span className="notif-badge">3</span>
        </button>

        <div className="user-avatar">A</div>
       {/* 
  TODO: Admin/User API Integration
  Admin name, role, permissions, and avatar should later come from authentication/user profile API.
  Example:
  GET /api/auth/me
*/}


        <button type="button" className="admin-btn">
          <span>Admin</span>
          <i className="fa-solid fa-chevron-down admin-chevron"></i>
        </button>
      </div>
    </header>
  );
}

export default TopHeader;