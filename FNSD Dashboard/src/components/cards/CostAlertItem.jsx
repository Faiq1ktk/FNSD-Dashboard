
// Reusable Cost Alert Component
// This component renders one cost alert.
// In production, cost threshold alerts should come from backend costing APIs.

function CostAlertItem({ item }) {
  return (
    <div className={`cost-alert-item ${item.bgClass}`}>
      <span className={`cost-alert-dot ${item.dotClass}`}></span>

      <div className="cost-alert-text">
        <strong className={item.titleClass || ""}>{item.title}</strong>
        <span>{item.subtitle}</span>
      </div>
    </div>
  );
}

export default CostAlertItem;