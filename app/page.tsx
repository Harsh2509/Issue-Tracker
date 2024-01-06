"use client";

import { Card, Flex } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
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
import { useEffect, useRef, useState } from "react";
import IssueTable from "./components/IssueTable";

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default function Home() {
  return (
    <Flex align="center" gap="2">
      <Canvas />
      <IssueTable />
    </Flex>
  );
}

const Canvas = () => {
  const canvasRef = useRef(null);
  const labelBarChart = ["Open", "In Progress", "Closed"];
  const [countEachIssueType, setCountEachIssueType] = useState([0, 0, 0]);

  useEffect(() => {
    (async () => {
      const chartCanvas = canvasRef.current;
      const labelBarChart = ["Open", "In Progress", "Closed"];
      const issues = (await axios.get("/api/issues")).data;
      let newCount = [0, 0, 0];
      issues.forEach((element: (typeof issues)[0]) => {
        if (element.status === "OPEN") {
          newCount[0]++;
        } else if (element.status === "IN_PROGRESS") {
          newCount[1]++;
        } else {
          newCount[2]++;
        }
      });

      if (JSON.stringify(newCount) != JSON.stringify(countEachIssueType)) {
        setCountEachIssueType(newCount);
      }

      const dataBarChart = {
        labels: labelBarChart,
        datasets: [
          {
            label: "# of Issues",
            data: newCount,
            borderWidth: 1,
            backgroundColor: "brown",
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
        setCountEachIssueType([0, 0, 0]);
      }
    };
  }, [countEachIssueType]);

  return (
    <div className="overflow-hidden m-10 max-w-xl basis-1/2 h-2/3">
      <div className="flex items-center justify-around">
        {labelBarChart.map((issueType, index) => {
          return (
            <div className="flex-grow border-x-2" key={issueType}>
              <Card>
                <Flex direction="column">
                  <p>{issueType}</p>
                  <h6>{countEachIssueType[index]}</h6>
                </Flex>
              </Card>
            </div>
          );
        })}
      </div>
      <canvas className="p-10" id="chartBar" ref={canvasRef}></canvas>
    </div>
  );
};
