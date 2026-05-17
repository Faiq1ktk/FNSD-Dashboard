// TODO: Backend API Integration
// Currently this card reads static inventorySummary.
// In production, backend should return inventory value,
// near expiry value, low stock value, out of stock count, and dead stock value.



import { inventorySummary } from "../../data/alertData";

function InventorySummary() {
  return (
    <div className="inventory-summary">
      {inventorySummary.map((item) => (
        <div key={item.id} className="inv-row">
          <div className="inv-label">
            <i className={`${item.iconClass} inv-icon ${item.colorClass}`}></i>
            <span>{item.label}</span>
          </div>

          <div className={`inv-val ${item.colorClass}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default InventorySummary;