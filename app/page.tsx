"use client";

import axios from "axios";
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
  return <Canvas />;
}

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      const chartCanvas = canvasRef.current;
      const labelBarChart = ["Open", "In Progress", "Closed"];
      const issues = (await axios.get("/api/issues")).data;

      const countEachIssueType = [0, 0, 0];
      issues.forEach((element: (typeof issues)[0]) => {
        if (element.status === "OPEN") {
          countEachIssueType[0]++;
        } else if (element.status === "IN_PROGRESS") {
          countEachIssueType[1]++;
        } else {
          countEachIssueType[2]++;
        }
      });

      const dataBarChart = {
        labels: labelBarChart,
        datasets: [
          {
            label: "# of Issues",
            data: countEachIssueType,
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
    })();

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
};
