import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// TODO: Backend API Integration
// Currently this chart reads static mealProductionChartData.
// In production, receive produced vs served meal data from kitchen/production APIs.


import { mealProductionChartData } from "../../data/chartData";

function MealProductionChart() {
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
// This creates meal-wise Produced vs Served bar chart.

    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: mealProductionChartData.labels,
        datasets: [
          {
            label: "Produced",
            data: mealProductionChartData.produced,
            backgroundColor: "#42a5f5",
            borderRadius: 4,
          },
          {
            label: "Served",
            data: mealProductionChartData.served,
            backgroundColor: "#66bb6a",
            borderRadius: 4,
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
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="chart-wrap chart-meal-production">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default MealProductionChart;