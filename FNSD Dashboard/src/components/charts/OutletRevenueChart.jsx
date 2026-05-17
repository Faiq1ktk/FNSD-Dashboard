import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";


// TODO: Backend API Integration
// Currently this chart reads static outletRevenueChartData.
// In production, receive outlet-wise breakfast/lunch/dinner revenue from backend APIs.

import { outletRevenueChartData } from "../../data/chartData";

function OutletRevenueChart() {
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
// This creates outlet-wise revenue comparison chart for Breakfast, Lunch, and Dinner.

    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: outletRevenueChartData.labels,
        datasets: [
          {
            label: "Breakfast",
            data: outletRevenueChartData.breakfast,
            backgroundColor: "#42a5f5",
            borderRadius: 4,
          },
          {
            label: "Lunch",
            data: outletRevenueChartData.lunch,
            backgroundColor: "#7e57c2",
            borderRadius: 4,
          },
          {
            label: "Dinner",
            data: outletRevenueChartData.dinner,
            backgroundColor: "#ff7043",
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
    <div className="chart-wrap chart-outlet-revenue">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default OutletRevenueChart;