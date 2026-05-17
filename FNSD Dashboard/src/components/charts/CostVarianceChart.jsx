import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// TODO: Backend API Integration
// Currently this chart reads static costVarianceData.
// In production, receive standard cost, actual cost, and variance percentage from backend.
// Backend should calculate variance accurately before sending to frontend.
import { costVarianceData } from "../../data/chartData";

function CostVarianceChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    Chart.defaults.font.family =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.font.size = 11;

    // Chart.js Rendering Logic
// This creates a mixed bar + line chart.
// Bars show standard/actual cost, and line shows variance percentage.

    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: costVarianceData.labels,
        datasets: [
          {
            label: "Standard Cost (Rs. )",
            data: costVarianceData.standardCost,
            backgroundColor: "#42a5f5",
            borderRadius: 4,
          },
          {
            label: "Actual Cost (Rs. )",
            data: costVarianceData.actualCost,
            backgroundColor: "#66bb6a",
            borderRadius: 4,
          },
          {
            label: "Variance %",
            data: costVarianceData.variancePercent,
            type: "line",
            borderColor: "#e53935",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "#e53935",
            yAxisID: "y2",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
              font: {
                size: 10,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: "#f0f2f5",
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y2: {
            position: "right",
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
              callback: (value) => `${value}%`,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="chart-wrap chart-cost-variance">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default CostVarianceChart;