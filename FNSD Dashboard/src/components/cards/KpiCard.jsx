import { memo } from "react";

import useAnimatedNumber from "../../hooks/useAnimatedNumber";

function KpiValueLoader() {
  return (
    <span className="kpi-value-loader" aria-label="Loading KPI value">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

function KpiCard({ card }) {
  const isDown = card.comparisonDirection === "down";
  const hasComparison = Boolean(card.comparisonLabel && card.comparisonValue);

  // Animated value works for current API KPI and future API KPI values
  const animatedValue = useAnimatedNumber(card.value);

  return (
    <div className={`kpi-card ${card.bgClass}`}>
      <div className="kpi-label">{card.label}</div>

      <i className={`${card.iconClass} kpi-icon`} aria-hidden="true"></i>

      <div className="kpi-value">
        {card.loading ? <KpiValueLoader /> : animatedValue}
      </div>

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

export default memo(KpiCard);