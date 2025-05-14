import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from "recharts";

const data = [
  { date: "20", sales: 3500 },
  { date: "22", sales: 8500 },
  { date: "24", sales: 4600 },
  { date: "26", sales: 5000 },
  { date: "28", sales: 3300 },
  { date: "30", sales: 4800 },
  { date: "02", sales: 3100 },
  { date: "04", sales: 8500 },
  { date: "06", sales: 4000 },
  { date: "08", sales: 2900 },
  { date: "10", sales: 9000 },
  { date: "12", sales: 4700 },
  { date: "14", sales: 3900 },
  { date: "16", sales: 4600 },
];

const CustomBar = (props) => {
  const { x, y, width, height, payload } = props;
  const barWidth = height < 20 ? 1 : 4;
  const offset = (width - barWidth) / 2;

  const isTallEnough = height >= 10;

  return (
    <rect
      x={x + offset}
      y={y}
      width={barWidth}
      height={height}
      fill={payload.highlight ? "#FF3B3B" : "#FFA500"}
      rx={isTallEnough ? 1 : 0}
      ry={isTallEnough ? -1 : 0}
    />
  );
};


export default function SalesByDateChart() {
  return (
    <div className="bg-whiterounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-[#1f2a37]">Sales By Date</h2>
        <a href="#" className="text-sm text-[#6b7280] hover:text-blue-600 transition-all">
          Advanced Report →
        </a>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(v) => `$${v}`}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Sales"]}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb" }}
          />
          <Bar dataKey="sales" shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}