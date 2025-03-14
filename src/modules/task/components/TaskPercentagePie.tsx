import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TaskPercentagePie = () => {
  //   const { data } = useGetTicketDashboardCountQuery();
  //   const {
  //     total_solve = 0,
  //     total_forward = 0,
  //     total_inprogress = 0,
  //     total_unsolved = 0,
  //   } = data?.data || {};

  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 41, 17, 15], // Default static data, replaced dynamically
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Solved", "In Progress", "Unsolved", "Forward"], // Default labels
      colors: ["#72b92b", "#0088FE", "#FF0000", "#FFA500"],
      legend: {
        position: "bottom",
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(
    () => {
      const taskPieData = [
        { name: "Pending", value: 45 },
        { name: "In Progress", value: 85 },
        { name: "Forwarded", value: 20 },
        { name: "Completed", value: 120 },
      ];

      setState((prevState) => ({
        ...prevState,
        series: taskPieData.map((item) => item.value),
        options: {
          ...prevState.options,
          labels: taskPieData.map((item) => item.name),
        },
      }));
    },
    [
      // data
    ]
  );

  return (
    <div style={{ maxWidth: "260px", margin: "0 auto" }}>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height={300}
        />
      </div>
    </div>
  );
};

export default TaskPercentagePie;
