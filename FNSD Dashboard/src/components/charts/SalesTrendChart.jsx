import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";


// TODO: Backend API Integration
// Currently this chart reads static salesTrendData.
// In production, receive chart data through props from Dashboard.jsx.
// Example:
// function SalesTrendChart({ data }) { ... }
// Backend should provide labels and values.

import { salesTrendData } from "../../data/chartData";

function SalesTrendChart() {
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
// This creates the Sales Trend line chart on canvas.
// When backend data changes, destroy old chart and recreate it with new labels/values.

    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: salesTrendData.labels,
        datasets: [
          {
            label: "Sales (Rs.)",
            data: salesTrendData.values,
            borderColor: "#1565c0",
            backgroundColor: "rgba(21, 101, 192, 0.10)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#1565c0",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `Rs. ${Number(context.raw).toLocaleString("en-IN")}`,
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
              callback: (value) => `Rs. ${value / 1000}K`,
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
    <div className="chart-wrap chart-sales-trend">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default SalesTrendChart;