// TODO: Backend API Integration
// Currently this table reads static recipeCostSnapshot.
// In production, backend should return recipe standard cost, actual cost,
// variance amount, variance percentage, and status.


import { recipeCostSnapshot } from "../../data/tableData";

function RecipeCostTable() {
  return (
    <>
      <table className="dash-table recipe-cost-table">
        <colgroup>
          <col className="recipe-col-name" />
          <col className="recipe-col-std" />
          <col className="recipe-col-actual" />
          <col className="recipe-col-var-rs" />
          <col className="recipe-col-var-percent" />
          <col className="recipe-col-status" />
        </colgroup>

        <thead>
          <tr>
            <th>Item<br />Name</th>
            <th>Std<br />Cost</th>
            <th>Actual<br />Cost</th>
            <th>Var<br />(Rs. )</th>
            <th>Var%</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recipeCostSnapshot.map((item) => (
            <tr key={item.id}>
              <td className="recipe-item-name">{item.itemName}</td>

              <td className="recipe-num-cell">{item.stdCost}</td>

              <td className="recipe-num-cell">{item.actualCost}</td>

              <td
                className={`recipe-num-cell ${
                  item.varianceType === "up" ? "text-up" : "text-down"
                }`}
              >
                {item.varianceRs}
              </td>

              <td
                className={`recipe-num-cell ${
                  item.varianceType === "up" ? "text-up" : "text-down"
                }`}
              >
                {item.variancePercent}
              </td>

              <td className="recipe-status-cell">
                <span className={`status-badge status-${item.statusType}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-note">
        Note: Variance % = (Actual Cost – Std Cost) / Std Cost
      </div>
    </>
  );
}

export default RecipeCostTable;