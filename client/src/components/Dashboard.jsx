import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = ({ employeeData }) => {
  const COLORS = {
    Completed: "#00C49F",
    Pending: "#FFBB28",
    "Not Start": "grey",
  };

  // const employeeData = employeeData.sort((a, b) => {
  //   const statusOrder = {
  //     Completed: 0,
  //     Pending: 1,
  //     "Not Start": 2,
  //   };
  //   return statusOrder[a.Status] - statusOrder[b.Status];
  // });

  // const totalCompletedPercentage = (
  //   (employeeData.reduce((acc, project) => {
  //     if (project.Status === "Completed") {
  //       return acc + project.duration;
  //     }
  //     return acc;
  //   }, 0) /
  //     employeeData.reduce((acc, project) => acc + project.duration, 0)) *
  //   100
  // ).toFixed(2);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + (radius + 10) * Math.cos(-midAngle * RADIAN); // Adjust 10 for label distance
    const y = cy + (radius + 10) * Math.sin(-midAngle * RADIAN); // Adjust 10 for label distance

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${employeeData[index].project_leader}-${employeeData[index].percentage1}`}
      </text>
    );
  };

  const chartData = employeeData.map((project) => ({
    name: project.project_leader,
    value: project.percentage1,
  }));

  return (
    <div className="chart-page-container">
      <h1>Chart Page</h1>
      <div>
        <PieChart width={800} height={400}>
          <Pie
            data={chartData}
            cx={400}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[employeeData[index].Status]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <div style={{ textAlign: "center" }}>
          Total Completed Percentage: {totalCompletedPercentage}%
        </div>
      </div>
    </div>
  );
};

export default Dashboard;