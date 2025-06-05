// src/app/main/landlord/metrics/page.tsx
"use client";

import React from "react";
import EarningsTimeGraph from "./components/EarningsTime";
import EarningsChart from "./components/PredictedEarnings";

export default function MetricsPage() {
  const earningsData = [
    { label: "Week 1", earnings: 10 },
    { label: "Week 2", earnings: 15 },
    { label: "Week 3", earnings: 20 },
    { label: "Week 4", earnings: 25 }
  ];

  return (
    <div className="p-6 flex flex-row  items-center justify-center flex-wrap ">
      <EarningsTimeGraph data={earningsData} predictedPercentage={40} />
      <EarningsChart />
    </div>
  );
}
