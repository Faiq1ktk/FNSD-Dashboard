
// Reusable Alert Component
// This component renders one alert item.
// In production, alerts should come from backend alert/inventory APIs.

function AlertItem({ alert }) {
  return (
    <div className={`alert-item alert-${alert.type}`}>
      <i className={`${alert.iconClass} alert-icon ${alert.type}`}></i>

      <div className="alert-text">
        <strong>{alert.title}</strong>
        <span>{alert.subtitle}</span>
      </div>
    </div>
  );
}

export default AlertItem;