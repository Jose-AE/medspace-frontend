"use client";

import Button from "@/components/Button";
import React from "react";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer
} from "recharts";
import { useEarnings } from "@/hooks/useEarnings";

const EarningsTimeGraph: React.FC = () => {
  const { data, isLoading, error, fetchWeeklyEarnings } = useEarnings();

  if (error) {
    return (
      <div className="p-8 w-full max-w-4xl flex flex-col items-center border border-gray-300 rounded-2xl shadow-md bg-white">
        <p className="text-red-500">Error loading earnings data</p>
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-4xl flex flex-col items-center border border-gray-300 rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Income Over Time</h2>

      {isLoading ? (
        <p className="text-muted-foreground text-sm text-center mt-10 mb-20">
          Loading income data...
        </p>
      ) : !data?.length ? (
        <p className="text-muted-foreground text-sm text-center mt-10 mb-20">
          No income data available.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" barSize={40} fill="#E5E7EB" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#3B82F6"
                strokeWidth={2}
                dot
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      )}

      <div className="mt-4 flex gap-2">
        <Button variant="blue" size="default" onClick={fetchWeeklyEarnings}>
          Weekly
        </Button>
      </div>
    </div>
  );
};

export default EarningsTimeGraph;
