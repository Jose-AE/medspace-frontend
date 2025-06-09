"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { EarningPrediction } from "@/services/PythonService";

interface Props {
  data?: EarningPrediction[];
}

const defaultData: EarningPrediction[] = [
  { date: "2025-06-10", predictedAmount: 95.5 }, // Tuesday
  { date: "2025-06-11", predictedAmount: 102.3 }, // Wednesday
  { date: "2025-06-12", predictedAmount: 98.7 }, // Thursday
  { date: "2025-06-13", predictedAmount: 110.2 }, // Friday (typically higher)
  { date: "2025-06-14", predictedAmount: 120.8 }, // Saturday (peak)
  { date: "2025-06-15", predictedAmount: 115.4 }, // Sunday (still high)
  { date: "2025-06-16", predictedAmount: 90.6 } // Monday (dip)
];

export default function EarningsChart({ data = defaultData }: Props) {
  const { lastPredicted, growthRate } = useMemo(() => {
    // Since we only have predicted data in the new format, we'll show 0% growth
    const lastPredicted = data[data.length - 1];
    const growthRate = 0; // No actual data to compare against

    return { lastPredicted, growthRate };
  }, [data]);

  const formatCurrency = (value: number | null) =>
    value === null
      ? "-"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        }).format(value);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-1 border-gray-300 rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Predicted Earnings</h2>
          <p className="text-sm text-gray-500">
            Actual vs. predicted earnings for the current year
          </p>
        </div>
      </div>

      <div className="h-[300px] w-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="#888"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              stroke="#888"
              fontSize={12}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === "actual" ? "Actual" : "Predicted"
              ]}
              contentStyle={{ fontSize: "0.875rem" }}
            />
            <Area
              type="monotone"
              dataKey="predictedAmount"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#colorPredicted)"
              activeDot={{ r: 5 }}
              dot={{ r: 0 }}
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t pt-4 mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">Year-end projection</p>
          <p className="text-2xl font-bold">
            {formatCurrency(lastPredicted?.predictedAmount ?? null)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Projected growth</p>

          {growthRate >= 0 && (
            <div className="flex items-center justify-end">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-2xl font-bold text-green-500">{growthRate}%</p>
            </div>
          )}

          {growthRate < 0 && (
            <div className="flex items-center justify-end">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <p className="text-2xl font-bold text-red-500">{growthRate}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
