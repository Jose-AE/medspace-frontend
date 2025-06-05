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

export interface EarningsDataPoint {
  label: string;
  earnings: number;
}

export interface EarningsTimeGraphProps {
  data: EarningsDataPoint[];
  predictedPercentage: number;
}

const EarningsTimeGraph: React.FC<EarningsTimeGraphProps> = ({
  data,
  predictedPercentage
}) => {
  return (
    <div className="p-2 w-[350px] flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Earnings Over Time</h2>

      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center mt-10 mb-20">
          No earnings data available.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="105%" height={200} className="-ml-6">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 50]} />
              <Tooltip />
              <Bar dataKey="earnings" barSize={20} fill="#E5E7EB" />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#3B82F6"
                strokeWidth={2}
                dot
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-4 text-sm text-left ml-6">
            <span className="text-xl text-left font-bold">
              {predictedPercentage}%
            </span>{" "}
            Your sales performance is {predictedPercentage}% better compared to
            last month
          </div>
        </>
      )}

      <div className="mt-4 flex gap-2">
        <Button variant="blue" size="default">
          Monthly
        </Button>
        <Button variant="blue" size="default">
          Anual
        </Button>
      </div>
    </div>
  );
};

export default EarningsTimeGraph;


