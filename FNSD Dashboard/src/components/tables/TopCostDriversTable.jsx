import { topCostDrivers } from "../../data/tableData";

function getTrendIcon(trend) {
  if (trend === "up") {
    return <i className="fa-solid fa-arrow-up trend-up"></i>;
  }

  if (trend === "down") {
    return <i className="fa-solid fa-arrow-down trend-down"></i>;
  }

  return <i className="fa-solid fa-minus trend-flat"></i>;
}

function TopCostDriversTable() {
  return (
    <table className="dash-table top-cost-table">
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Cost Impact (Rs. )</th>
          <th>Trend</th>
        </tr>
      </thead>

      <tbody>
        {topCostDrivers.map((item) => (
          <tr key={item.id}>
            <td>{item.ingredient}</td>
            <td>{item.costImpact}</td>
            <td className="trend-cell">{getTrendIcon(item.trend)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TopCostDriversTable;