// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
// import { useGetCategoryWiseDashboardDataQuery } from "../api/ticketEndpoint";

// const renderLabels = (props: any) => {
//   const RADIAN = Math.PI / 180;

//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 25) * cos;
//   const my = cy + (outerRadius + 25) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={payload.color}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={payload.color}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//         className="text-sm font-medium"
//       >
//         {`${payload.name} (${(percent * 100).toFixed(1)}%)`}
//       </text>
//       {/* <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#666"
//         className="text-xs"
//       >
//         ${value}
//         {` (${(percent * 100).toFixed(1)}%)`}
//       </text> */}
//     </g>
//   );
// };

// const PieChartWithLabels = () => {
//   const { data: pieData } = useGetCategoryWiseDashboardDataQuery();
//   const colors = [
//     "#FF6B6B", // Red
//     "#4ECDC4", // Teal
//     "#45B7D1", // Sky Blue
//     "#96CEB4", // Light Green
//     "#FFB74D", // Orange
//     "#9575CD", // Purple
//     "#F06292", // Pink
//     "#A5D6A7", // Mint Green
//     "#FFD54F", // Yellow
//     "#64B5F6", // Light Blue
//     "#000000", // Black
//     "#00FF00", // Lime
//     "#800000", // Maroon
//     "#FFD700", // Gold
//     "#B22222", // FireBrick
//   ];
//   const activeIndex: number[] = [];
//   const chartData = pieData?.data
//     ?.filter((item) => item.ticket_count > 0)
//     .map((item, index) => {
//       activeIndex.push(index);
//       return {
//         name: item.category_title,
//         value: item.ticket_count,
//         color: colors[index],
//       };
//     });

//   return (
//     <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             innerRadius={30}
//             outerRadius={60}
//             dataKey="value"
//             activeShape={renderLabels}
//             activeIndex={activeIndex}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PieChartWithLabels;
import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useGetCategoryWiseDashboardDataQuery } from "../api/ticketEndpoint";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 15}
        outerRadius={outerRadius + 17}
        fill={payload.color}
      />
    </g>
  );
};

const PieChartWithLabels = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { data: pieData } = useGetCategoryWiseDashboardDataQuery();

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFB74D",
    "#9575CD",
    "#F06292",
    "#A5D6A7",
    "#FFD54F",
    "#64B5F6",
    "#000000",
    "#00FF00",
    "#800000",
    "#FFD700",
    "#B22222",
  ];

  const chartData = pieData?.data
    ?.filter((item) => item.ticket_count > 0)
    .map((item, index) => ({
      name: item.category_title,
      value: item.ticket_count,
      color: colors[index],
    }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex items-center justify-between w-full h-[300px]">
      <div className="w-2/3 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
            ></Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-1/3 pl-1">
        <div className="space-y-2">
          {chartData?.map((entry, index) => (
            <div key={entry.name} className="flex items-center">
              <div
                className="w-3 h-3 mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[11px]">
                {entry.name}
                {activeIndex === index && (
                  <span className="ml-1 font-medium">({entry.value})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartWithLabels;
