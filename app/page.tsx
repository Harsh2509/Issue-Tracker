"use client";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  ChartTypeRegistry,
  LinearScale,
} from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const chartCanvas = canvasRef.current;

    const labelBarChart = ["Open", "In Progress", "Closed"];

    const dataBarChart = {
      labels: labelBarChart,
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3],
          borderWidth: 1,
          backgroundColor: "purple",
        },
      ],
    };

    const optionBarChart = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const configBarChart: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      string
    > = {
      type: "bar",
      data: dataBarChart,
      options: optionBarChart,
    };

    chartCanvas && new Chart(chartCanvas, configBarChart);

    return () => {
      if (canvasRef.current) {
        canvasRef.current = null;
      }
    };
  }, []);

  return (
    <div className="overflow-hidden m-10 max-w-xl h-2/3">
      <div className="py-3 px-5 bg-gray-50">Bar chart</div>
      <canvas className="p-10" id="chartBar" ref={canvasRef}></canvas>
    </div>
  );
}
