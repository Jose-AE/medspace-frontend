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

interface DataPoint {
  month: string;
  actual: number | null;
  predicted: number;
}

interface Props {
  data?: DataPoint[];
}

const defaultData: DataPoint[] = [
  { month: "Jan", actual: 5400, predicted: 6000 },
  { month: "Feb", actual: 6200, predicted: 6800 },
  { month: "Mar", actual: 7100, predicted: 7800 },
  { month: "Apr", actual: 8300, predicted: 9000 },
  { month: "May", actual: 9100, predicted: 9800 },
  { month: "Jun", actual: 10200, predicted: 11000 },
  { month: "Jul", actual: 11500, predicted: 12300 },
  { month: "Aug", actual: 12700, predicted: 13500 },
  { month: "Sep", actual: null, predicted: 14800 },
  { month: "Oct", actual: null, predicted: 16200 },
  { month: "Nov", actual: null, predicted: 17500 },
  { month: "Dec", actual: null, predicted: 19000 }
];

export default function EarningsChart({ data = defaultData }: Props) {
  const { lastPredicted, growthRate } = useMemo(() => {
    const lastActual = [...data].reverse().find((d) => d.actual !== null);
    const lastPredicted = data[data.length - 1];
    const growthRate =
      lastPredicted && lastActual?.actual
        ? Math.round(
            ((lastPredicted.predicted - lastActual.actual) /
              lastActual.actual) *
              100
          )
        : 0;
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
              dataKey="month"
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
              dataKey="actual"
              stroke="#4F46E5"
              strokeWidth={2}
              fill="url(#colorActual)"
              activeDot={{ r: 5 }}
              dot={{ r: 2 }}
              name="Actual"
            />
            <Area
              type="monotone"
              dataKey="predicted"
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
            {formatCurrency(lastPredicted?.predicted ?? null)}
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
