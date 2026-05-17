import { workflowSteps } from "../../data/workflowData";

function WorkflowSteps() {
  return (
    <div className="workflow-section">
      <div className="nav-section-title">FNSD WORKFLOW</div>

      <div className="workflow-steps">
        {workflowSteps.map((step) => {
          const stepClass =
            step.status === "done"
              ? "done"
              : step.status === "active"
              ? "active-step"
              : "";

          return (
            <button key={step.id} type="button" className="workflow-step">
              <div className={`step-num ${stepClass}`}>{step.number}</div>

              <span>
                {step.title}

                {step.subtitle && (
                  <>
                    <br />
                    <small>{step.subtitle}</small>
                  </>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WorkflowSteps;