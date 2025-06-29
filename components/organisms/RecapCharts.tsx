"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a0522d",
  "#20b2aa",
];

interface RecapChartProps {
  data: {
    category: string;
    total: number;
  }[];
}

export default function RecapChart({ data }: RecapChartProps) {
  return (
    <div className="w-full h-80 bg-[#F5F5F7] border border-[#333] p-4 rounded-xl shadow text-[#333]">
      <h2 className="text-lg lg:text-2xl font-semibold mb-4">
        Expense Recap per Category
      </h2>
      {!data || data.length === 0 ? (
        <div className="text-gray-500 text-center w-full h-full flex items-center justify-center text-base">
          There is no transaction data yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {data.map((entry, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
