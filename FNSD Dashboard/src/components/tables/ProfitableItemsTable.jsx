// TODO: Backend API Integration
// Currently this table reads static profitableItems.
// In production, receive items through props from Dashboard.jsx.
// Backend should return ranked profitable items based on revenue, profit, and margin.


import { profitableItems } from "../../data/tableData";

function ProfitableItemsTable() {
  return (
    <div className="table-scroll-profitable">
      <table className="dash-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Revenue (Rs. )</th>
            <th>Profit (Rs. )</th>
            <th>Margin%</th>
          </tr>
        </thead>

        <tbody>
          {profitableItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.qty}</td>
              <td>{item.revenue}</td>
              <td>{item.profit}</td>
              <td className="text-up">{item.margin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfitableItemsTable;