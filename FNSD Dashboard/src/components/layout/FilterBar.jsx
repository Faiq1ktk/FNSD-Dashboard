function FilterBar() {
  return (
    <section id="filter-bar">
      <div className="filter-left-group">
       {/* 
  TODO: Backend Filter Integration
  These filter controls will later be connected with React state.
  Selected values will be sent as query parameters to dashboard APIs.

  Example filters:
  selectedDate, outletId, categoryId, shiftId, mealType

  Example API usage:
  GET /api/dashboard/kpis?date=2025-05-25&outletId=all&categoryId=all&shiftId=all&mealType=all

  When Apply button is clicked, all dashboard cards, charts, tables, and alerts should refresh.
*/}

        <span className="filter-label">
          <i className="fa-solid fa-filter filter-icon"></i>
          Filters:
        </span>

        <input type="date" className="filter-date" defaultValue="2025-05-25" />

        <select className="filter-select filter-outlet" defaultValue="All Outlets">
          <option>All Outlets</option>
          <option>Main Cafeteria</option>
          <option>Staff Cafeteria</option>
          <option>OPD Cafeteria</option>
          <option>Tuck Shop</option>
        </select>

        <select
          className="filter-select filter-category"
          defaultValue="All Categories"
        >
          <option>All Categories</option>
          <option>South Indian</option>
          <option>North Indian</option>
          <option>Chinese</option>
          <option>Beverages</option>
          <option>Snacks</option>
          <option>Desserts</option>
        </select>

        <select className="filter-select filter-shift" defaultValue="All Shifts">
          <option>All Shifts</option>
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <select className="filter-select filter-meal" defaultValue="All Meal Types">
          <option>All Meal Types</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        {/* 
  TODO: Apply Filter Logic
  On click, call backend APIs again using selected filter values.
  Recommended future function:
  handleApplyFilters()
*/}

        <button type="button" className="filter-btn filter-btn-primary">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Apply</span>
        </button>
        {/* 
  TODO: Reset Filter Logic
  On click, reset filters to default values and reload dashboard data.
  Recommended future function:
  handleResetFilters()
*/}

        <button type="button" className="filter-btn filter-btn-secondary">
          <i className="fa-solid fa-rotate-right"></i>
          <span>Reset</span>
        </button>
      </div>
       
      {/* 
  TODO: Live Data Timestamp
  This timestamp should later come from backend API response.
  Backend can return lastUpdatedAt value after every dashboard refresh.
*/}

      <small className="last-updated">
        <i className="fa-solid fa-clock"></i>
        <span>Last Updated: 10:30 AM</span>
        <i className="fa-solid fa-rotate-right refresh-icon"></i>
      </small>
    </section>
  );
}

export default FilterBar;