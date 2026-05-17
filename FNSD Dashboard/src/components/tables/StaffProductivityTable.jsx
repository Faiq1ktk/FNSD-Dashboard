
// TODO: Backend API Integration
// Currently this table reads static staff productivity data.
// In production, backend should return staff attendance, shift-wise meals produced,
// meals per staff, and efficiency percentage.

import { staffProductivity, staffSummary, staffTotal } from "../../data/staffData";

function StaffProductivityTable() {
  return (
    <>
      <div className="staff-summary-grid">
        {staffSummary.map((item) => (
          <div key={item.id} className={`staff-summary-card ${item.bgClass}`}>
            <div className={`staff-summary-label ${item.textClass}`}>
              {item.label}
            </div>
            <div className={`staff-summary-value ${item.textClass}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="productivity-line">
        Productivity: <strong>94%</strong>
      </div>

      <table className="dash-table staff-table">
        <thead>
          <tr>
            <th>Shift</th>
            <th>Staff</th>
            <th>Meals Produced</th>
            <th>Meals/Staff</th>
            <th>Efficiency%</th>
          </tr>
        </thead>

        <tbody>
          {staffProductivity.map((item) => (
            <tr key={item.id}>
              <td>
                <span className={`shift-badge ${item.shiftClass}`}>
                  {item.shift}
                </span>
              </td>
              <td>{item.staff}</td>
              <td>{item.mealsProduced}</td>
              <td>{item.mealsPerStaff}</td>
              <td className="text-up">{item.efficiency}</td>
            </tr>
          ))}

          <tr className="staff-total-row">
            <td>{staffTotal.shift}</td>
            <td>{staffTotal.staff}</td>
            <td>{staffTotal.mealsProduced}</td>
            <td>{staffTotal.mealsPerStaff}</td>
            <td className="text-up">{staffTotal.efficiency}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default StaffProductivityTable;