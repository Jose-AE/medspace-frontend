"use client";

import { useState, useEffect } from "react";
import CDMXHeatmap from "../Heatmap/MaplibreHeatmap";
import SectionCards from "../MetricsCard/MetricsCard";

function isDataEmpty(
  data: Array<{ lat: number; lng: number; intensity: number }>
) {
  return !data || data.length === 0;
}

export default function LandlordView() {
  const [heatData, setHeatData] = useState<
    Array<{ lat: number; lng: number; intensity: number }>
  >([]);

  useEffect(() => {
    const centers = [
      { lat: 19.4326, lng: -99.1332, weight: 1.0 },
      { lat: 19.3437, lng: -99.203, weight: 0.8 },
      { lat: 19.5018, lng: -99.1269, weight: 0.7 },
      { lat: 19.3733, lng: -99.0995, weight: 0.9 },
      { lat: 19.391, lng: -99.1663, weight: 0.8 },
      { lat: 19.4407, lng: -99.2052, weight: 0.85 }
    ];

    const generateHeatData = () => {
      [];
    };
  }, []);

  return (
    <div className="container items-center justify-items mx-auto">
      <SectionCards />

      <div className="border-4 w-full h-[450px] p-4 bg-white rounded-sm flex-col flex">
        <h1 className="text-2xl font-bold text-left px-4 mt-2">
          Specialist concentration in CDMX
        </h1>
        <p className="text-gray-500 mb-4 text-left px-4">
          Heat map showing the distribution of medical specialists across
          different regions.
        </p>

        <div className="flex items-center gap-4">
          <select className="border rounded-md px-4 py-2 text-gray-700 shadow-sm">
            <option>All Regions</option>
          </select>
          <select className="border rounded-md px-4 py-2 text-gray-700 shadow-sm">
            <option>All Specialties</option>
          </select>
        </div>

        {isDataEmpty(heatData) ? (
          <div className="flex justify-center items-center h-full text-gray-400 italic">
            No data available to display on the heatmap.
          </div>
        ) : (
          <div className="w-3/4 ml-auto">
            <CDMXHeatmap data={heatData} />
          </div>
        )}
      </div>
    </div>
  );
}
