"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import Heatmap from "./MaplibreHeatmap";
import SelectInput from "@/components/SelectInput";
import { RentRequestService } from "@/services/RentRequestService";
import { RentRequestDashboardData } from "@/types/rentRequestTypes";

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity?: number;
}

export default function SpecialistHeatmapSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<RentRequestDashboardData[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapDataPoint[]>([]);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  }>({
    lat: 19.4326,
    lng: -99.1332,
    zoom: 10
  });

  // Generate options from raw data
  const regionOptions = useMemo(() => {
    if (!rawData.length) return [{ name: "All Regions", value: "" }];

    const uniqueRegions = Array.from(
      new Set(rawData.map((item) => item.clinicBorough))
    )
      .filter(Boolean)
      .sort();

    return [
      { name: "All Regions", value: "" },
      ...uniqueRegions.map((region) => ({ name: region, value: region }))
    ];
  }, [rawData]);

  const specialtyOptions = useMemo(() => {
    if (!rawData.length) return [{ name: "All Specialties", value: "" }];

    const uniqueSpecialties = Array.from(
      new Set(rawData.map((item) => item.tenantSpecialty))
    )
      .filter(Boolean)
      .sort();

    return [
      { name: "All Specialties", value: "" },
      ...uniqueSpecialties.map((specialty) => ({
        name: specialty,
        value: specialty
      }))
    ];
  }, [rawData]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        setLoading(true);
        setError(null);

        const response = await RentRequestService.getSpecialistsDashboard();

        if (!response.success || !response.data) {
          throw new Error(response.message || "Error loading data");
        }

        setRawData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!rawData.length) return;

    // Filter data based on selections
    const filteredData = rawData.filter((item) => {
      const matchesRegion =
        !selectedRegion || item.clinicBorough === selectedRegion;
      const matchesSpecialty =
        !selectedSpecialty || item.tenantSpecialty === selectedSpecialty;
      return matchesRegion && matchesSpecialty;
    });

    // Transform to heatmap points
    const points: HeatmapDataPoint[] = filteredData.map((item) => ({
      lat: item.clinicLatitude,
      lng: item.clinicLongitude,
      intensity: 0.9
    }));

    setHeatmapData(points);

    // Update map center based on selection
    if (selectedRegion) {
      // You might want to add a mapping of regions to their centers
      const regionCenters: Record<string, { lat: number; lng: number }> = {
        "Álvaro Obregón": { lat: 19.355, lng: -99.1944 },
        "Benito Juárez": { lat: 19.3984, lng: -99.1776 },
        Coyoacán: { lat: 19.3467, lng: -99.1617 },
        Cuajimalpa: { lat: 19.355, lng: -99.2917 },
        Cuauhtémoc: { lat: 19.4326, lng: -99.1332 },
        "Gustavo A. Madero": { lat: 19.4847, lng: -99.1089 },
        Iztacalco: { lat: 19.3957, lng: -99.0978 },
        Iztapalapa: { lat: 19.355, lng: -99.0917 },
        "Magdalena Contreras": { lat: 19.325, lng: -99.2417 },
        "Miguel Hidalgo": { lat: 19.415, lng: -99.1917 },
        "Milpa Alta": { lat: 19.1917, lng: -99.025 },
        Tláhuac: { lat: 19.275, lng: -99.0083 },
        Tlalpan: { lat: 19.2917, lng: -99.1667 },
        "Venustiano Carranza": { lat: 19.425, lng: -99.1083 },
        Xochimilco: { lat: 19.2583, lng: -99.1083 }
      };

      const center = regionCenters[selectedRegion] || {
        lat: 19.4326,
        lng: -99.1332
      };
      setMapCenter({
        ...center,
        zoom: 12
      });
    } else {
      setMapCenter({
        lat: 19.4326,
        lng: -99.1332,
        zoom: 10
      });
    }
  }, [rawData, selectedRegion, selectedSpecialty]);

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
  };

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-gray-600">Loading data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-2">
            Specialist Concentration by Area
          </h2>
          <p className="text-gray-600 mb-4">
            Heat map showing the distribution of medical specialists across
            Mexico City regions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-4/5 xl:w-2/3">
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Region</h3>
              <SelectInput
                values={regionOptions}
                value={selectedRegion}
                onChange={handleRegionChange}
                disabled={loading}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Specialty
              </h3>
              <SelectInput
                values={specialtyOptions}
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[400px]">
          <Heatmap data={heatmapData} center={mapCenter} />
        </div>
      </div>
    </section>
  );
}
