import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useGetDashboardBloodDataQuery } from "../api/dashboardEndPoints";

const ReactPieChart = () => {
  const { data: bloodData } = useGetDashboardBloodDataQuery();
  const {
    total_a_positive,
    total_b_positive,
    total_ab_positive,
    total_o_positive,
    total_a_negative,
    total_b_negative,
    total_ab_negative,
    total_0_negative,
  } = bloodData?.data || {};
  const data = [
    { name: "A+", value: total_a_positive },
    { name: "A-", value: total_a_negative },
    { name: "B+", value: total_b_positive },
    { name: "B-", value: total_b_negative },
    { name: "AB+", value: total_ab_positive },
    { name: "AB-", value: total_ab_negative },
    { name: "O+", value: total_o_positive },
    { name: "O-", value: total_0_negative },
  ];
  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: data.map((item) => item.name),
    series: data.map((item) => item.value),
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opts: any) {
        return (
          opts.w.config.labels[opts.seriesIndex] +
          ": " +
          opts.w.config.series[opts.seriesIndex]
        );
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="pie"
        height={400}
      />
    </div>
  );
};

export default ReactPieChart;
