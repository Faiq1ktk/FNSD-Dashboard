function KpiCard({ card }) {
  const isDown = card.comparisonDirection === "down";
  const hasComparison = Boolean(card.comparisonLabel && card.comparisonValue);

  return (
    <div className={`kpi-card ${card.bgClass}`}>
      <div className="kpi-label">{card.label}</div>

      <i className={`${card.iconClass} kpi-icon`} aria-hidden="true"></i>

      <div className="kpi-value">{card.value}</div>

      <div className="kpi-sub">
        {hasComparison ? (
          <>
            <span>{card.comparisonLabel}</span>
            <span className={isDown ? "down" : "up"}>
              <i
                className={`fa-solid ${
                  isDown ? "fa-arrow-down" : "fa-arrow-up"
                } kpi-arrow`}
              ></i>
              {card.comparisonValue}
            </span>
          </>
        ) : (
          <span>{card.subText}</span>
        )}
      </div>
    </div>
  );
}

export default KpiCard;