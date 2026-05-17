import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// TODO: Backend API Integration
// Currently this chart reads static categorySalesData.
// In production, receive category distribution data through props.
// Backend should return category labels, values, and optionally colors.


import { categorySalesData } from "../../data/chartData";

function CategorySalesChart() {
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

    // TODO: Backend API Integration
// Currently this chart reads static categorySalesData.
// In production, receive category distribution data through props.
// Backend should return category labels, values, and optionally colors.

    const chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: categorySalesData.labels,
        datasets: [
          {
            data: categorySalesData.values,
            backgroundColor: categorySalesData.colors,
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "58%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              font: {
                size: 10,
              },
              padding: 6,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
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
    <div className="chart-wrap chart-category-sales">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default CategorySalesChart;