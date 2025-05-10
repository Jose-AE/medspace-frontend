"use client";

import Button from "@/components/Button";
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface ComparedClinic {
  name: string;
  location: string;
  earnings: number;
  trend: "up" | "down";
  data: { value: number }[];
}

type Props = {
  clinic: ComparedClinic;
};

const ClinicMiniCard: React.FC<Props> = ({ clinic }) => {
  const arrow = clinic.trend === "up" ? "↑" : "↓";

  const arrowColor = clinic.trend === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-between p-1 w-[320px] max-w-md">
      <div>
        <h2 className="text-lg font-bold">{clinic.name}</h2>
        <p className="text-gray-600 text-sm">{clinic.location}</p>
      </div>

      <div className="w-20 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clinic.data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={clinic.trend === "up" ? "#4CAF50" : "#F44336"}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-right">
        <p className="text-xl font-bold">{clinic.earnings.toFixed(2)}</p>
      </div>

      <p className={`${arrowColor} text-sm p-2`}>{arrow}</p>
    </div>
  );
};

const ClinicComparisonGraph: React.FC = () => {
  const clinics: ComparedClinic[] = [];
  return (
    <div className="flex flex-col gap-1 mx-4 p-5">
      <h2 className="text-lg font-bold -mb-8">Clinic comparison</h2>
      <p className="text-base mt-6 mb-8">Daily average</p>

      {clinics.length === 0 ? (
        <p className="text-center text-muted-foreground mb-4">
          No clinics to compare available
        </p>
      ) : (
        <>
          {clinics.map((clinic, index) => (
            <React.Fragment key={index}>
              <ClinicMiniCard clinic={clinic} />
              {index < clinics.length - 1 && (
                <hr className="border-t border-gray-300 my-2" />
              )}
            </React.Fragment>
          ))}
        </>
      )}

      <div className="flex items-center justify-center mt-4">
        <Button variant="blue" size="fill">
          <p className="text-lg">Select clinic to compare</p>
        </Button>
      </div>
    </div>
  );
};

export default ClinicComparisonGraph;
