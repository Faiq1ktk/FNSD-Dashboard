
// TODO: Backend API Integration
// Currently this card reads static productionWastage.
// In production, backend should return planned production,
// actual production, achievement, wastage, overproduction, and estimated cost loss.

import { productionWastage } from "../../data/productionData";

function ProductionWastage() {
  return (
    <div className="production-wastage">
      {productionWastage.map((item) => (
        <div key={item.id} className="prod-row">
          <div className="prod-label">
            <i className={`${item.iconClass} ${item.colorClass}`}></i>
            <span>{item.label}</span>
          </div>

          <div className={`prod-val ${item.valueClass || ""}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductionWastage;