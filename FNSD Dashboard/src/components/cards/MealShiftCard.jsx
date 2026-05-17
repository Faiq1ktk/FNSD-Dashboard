// Reusable UI Component
// This component receives one meal object and displays produced/served data.
// In production, meal data should come from backend through Dashboard.jsx props.


function MealShiftCard({ meal }) {
  return (
    <div className="meal-shift-card">
      <div className="meal-icon">{meal.icon}</div>

      <div className="meal-title">{meal.title}</div>

      <div className="meal-nums">
        <div className="meal-num-item">
          <small>Produced</small>
          <strong>{meal.produced}</strong>
        </div>

        <div className="meal-num-item">
          <small>Served</small>
          <strong>{meal.served}</strong>
        </div>
      </div>

      <div className={`meal-pct ${meal.percentageClass}`}>
        {meal.percentage}
      </div>
    </div>
  );
}

export default MealShiftCard;