import Heatmap from "./MaplibreHeatmap";
import SelectInput from "@/components/SelectInput";
import { ExternalClinicService } from "@/services/ExternalClinicService";
import {
  ExternalClinicSpecialty,
  MexicanState,
  BoroughCenter
} from "@/types/externalClinicTypes";
import { ChangeEvent, useEffect, useState } from "react";

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export default function ClinicDemandDashboardSection() {
  const [selectedBorough, setSelectedBorough] = useState<MexicanState | "">("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    ExternalClinicSpecialty | ""
  >("");
  const [heatmapData, setHeatmapData] = useState<HeatmapDataPoint[]>([]);
  const [mapCenter, setMapCenter] = useState<BoroughCenter>({
    lat: 23.6345,
    lng: -102.5528,
    zoom: 5
  });
  const [boroughs, setBoroughs] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const clinicService = ExternalClinicService.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [boroughsData, specialtiesData] = await Promise.all([
          clinicService.getBoroughs(),
          clinicService.getSpecialties()
        ]);
        setBoroughs(boroughsData);
        setSpecialties(specialtiesData);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clinicService]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const data = await clinicService.getHeatmapData({
          borough: selectedBorough || undefined,
          specialty: selectedSpecialty || undefined
        });
        setHeatmapData(data);

        // Update map center when borough changes
        if (selectedBorough) {
          setMapCenter(clinicService.getBoroughCenter(selectedBorough));
        } else {
          setMapCenter({ lat: 23.6345, lng: -102.5528, zoom: 5 });
        }
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      }
    };

    fetchHeatmapData();
  }, [selectedBorough, selectedSpecialty, clinicService]);

  const boroughOptions = [
    { name: "All States", value: "" },
    ...boroughs.map((borough) => ({
      name: borough,
      value: borough
    }))
  ];

  const specialtyOptions = [
    { name: "All Specialties", value: "" },
    ...specialties.map((specialty) => ({
      name: specialty,
      value: specialty
    }))
  ];

  const handleBoroughChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBorough(e.target.value as MexicanState | "");
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value as ExternalClinicSpecialty | "");
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Clinic Demand by Area</h2>
          <p className="text-gray-600 mb-4">
            Heat map showing the distribution of clinic demand across Mexico
            City states.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-4/5 xl:w-2/3">
            <div className="w-full sm:w-1/2">
              <SelectInput
                values={boroughOptions}
                defaultValue=""
                onChange={handleBoroughChange}
                disabled={isLoading}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <SelectInput
                values={specialtyOptions}
                defaultValue=""
                onChange={handleSpecialtyChange}
                disabled={isLoading}
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
