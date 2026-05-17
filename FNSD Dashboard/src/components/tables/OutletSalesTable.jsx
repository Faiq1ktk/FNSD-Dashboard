// TODO: Backend API Integration
// Currently this table reads static outletSales and outletSalesTotal.
// In production, backend should return outlet-wise covers and revenue
// for breakfast, lunch, dinner, and total.


import { outletSales, outletSalesTotal } from "../../data/tableData";

function OutletSalesTable() {
  return (
    <table className="dash-table outlet-sales-table">
      <thead>
        <tr>
          <th rowSpan="2" className="outlet-main-head">
            Outlet
          </th>

          <th colSpan="2" className="meal-head breakfast-head">
            Breakfast
          </th>

          <th colSpan="2" className="meal-head lunch-head">
            Lunch
          </th>

          <th colSpan="2" className="meal-head dinner-head">
            Dinner
          </th>

          <th colSpan="2" className="meal-head total-head">
            Total
          </th>
        </tr>

        <tr>
          <th className="meal-sub breakfast-sub">Covers</th>
          <th className="meal-sub breakfast-sub">Revenue</th>

          <th className="meal-sub lunch-sub">Covers</th>
          <th className="meal-sub lunch-sub">Revenue</th>

          <th className="meal-sub dinner-sub">Covers</th>
          <th className="meal-sub dinner-sub">Revenue</th>

          <th className="meal-sub total-sub">Covers</th>
          <th className="meal-sub total-sub">Revenue</th>
        </tr>
      </thead>

      <tbody>
        {outletSales.map((row) => (
          <tr key={row.id}>
            <td className="outlet-name-cell">
              <strong>{row.outlet}</strong>
            </td>

            <td>{row.breakfastCovers}</td>
            <td>{row.breakfastRevenue}</td>

            <td>{row.lunchCovers}</td>
            <td>{row.lunchRevenue}</td>

            <td>{row.dinnerCovers}</td>
            <td>{row.dinnerRevenue}</td>

            <td>
              <strong>{row.totalCovers}</strong>
            </td>
            <td>
              <strong>{row.totalRevenue}</strong>
            </td>
          </tr>
        ))}

        <tr className="outlet-total-row">
          <td>
            <strong>{outletSalesTotal.outlet}</strong>
          </td>

          <td>{outletSalesTotal.breakfastCovers}</td>
          <td>{outletSalesTotal.breakfastRevenue}</td>

          <td>{outletSalesTotal.lunchCovers}</td>
          <td>{outletSalesTotal.lunchRevenue}</td>

          <td>{outletSalesTotal.dinnerCovers}</td>
          <td>{outletSalesTotal.dinnerRevenue}</td>

          <td>{outletSalesTotal.totalCovers}</td>
          <td>{outletSalesTotal.totalRevenue}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default OutletSalesTable;