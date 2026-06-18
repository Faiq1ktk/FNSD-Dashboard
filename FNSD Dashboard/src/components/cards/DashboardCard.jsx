import { memo } from "react";

// Reusable Wrapper Component
// This card is used across the dashboard for charts, tables, alerts, and summaries.
// Keep this component generic so backend-driven sections can reuse the same layout.

function DashboardCard({
  title,
  iconClass,
  iconColorClass = "",
  badge,
  bodyClassName = "",
  children,
}) {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="dash-card-title">
          {iconClass && <i className={`${iconClass} ${iconColorClass}`}></i>}
          <span>{title}</span>
          {badge && <span className="badge-today">{badge}</span>}
        </span>
      </div>

      <div className={`dash-card-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export default memo(DashboardCard);