// src/app/main/landlord/metrics/page.tsx
"use client";

import React, { useEffect } from "react";
import EarningsTimeGraph from "./components/EarningsTime";
import EarningsChart from "./components/PredictedEarnings";
import { EarningPrediction, PythonService } from "@/services/PythonService";

export default function MetricsPage() {
  const [predictedEarnings, setPredictedEarnings] = React.useState<
    EarningPrediction[]
  >([]);

  useEffect(() => {
    async function fetchPredictedEarnings() {
      try {
        const data = await PythonService.getPredictedEarnings();
        setPredictedEarnings(data);
      } catch (error) {
        console.error("Error fetching predicted earnings:", error);
      }
    }

    fetchPredictedEarnings();
  }, []);

  return (
    <div className="p-6 flex flex-row items-center justify-center flex-wrap ">
      <EarningsTimeGraph />
      <EarningsChart
        data={predictedEarnings.length > 0 ? predictedEarnings : undefined}
      />
    </div>
  );
}
