"use client";

import React, { useEffect, useState } from "react";
import ClinicsMap from "./components/ClinicsMap";
import { ClinicService } from "@/services/ClinicService";
import { Clinic, ClinicEquipmentType } from "@/types/clinicTypes";
import { constToTitleCase } from "@/lib/textUtils";
import ClinicFilterBar from "./components/ClinicFilterBar";
import { useAuth } from "@/hooks/useAuth";
import ClinicCard from "./components/ClinicCard";

interface SearchParams {
  location: string;
  date: Date | undefined;
  time: string;
  equipment: ClinicEquipmentType[];
  showSaved: boolean;
}

export default function Page() {
  const { authInitialized } = useAuth();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Fixed variable name (capital L)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    time: "12:00",
    equipment: [],
    date: undefined,
    location: "Mexico City",
    showSaved: false
  });

  useEffect(() => {
    if (!authInitialized) return; // Wait for auth state to be initialized so we can fetch clinics with user token

    setIsLoading(true);
    ClinicService.getClinics({
      includePhotos: true,
      includeEquipments: true,
      includeAvailabilities: true,
      targetDate: searchParams.date,
      equipmentList: searchParams.equipment,
      targetCity: searchParams.location,
      targetHour: searchParams.time
    })
      .then((data) => {
        setClinics(data);
      })
      .catch((error) => {
        console.error("Error fetching clinics:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams, authInitialized]);

  async function handleSearch(searchParams: SearchParams) {
    setSearchParams(searchParams);
  }

  return (
    <div className="flex h-[calc(100vh-70px)] overflow-hidden">
      {/* List Section */}
      <div className="w-3/4 flex flex-col">
        {/* Search & Filter */}
        <div className="p-4">
          <ClinicFilterBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Scrollable clinic list */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Loading clinics...</p>
            </div>
          ) : (
            <>
              {clinics.length > 0 ? (
                clinics.map((clinic, index) => (
                  <span key={index}>
                    <div className="border-t border-gray-300 mx-2"></div>
                    <ClinicCard
                      clinicId={clinic.id}
                      rating={clinic.averageRating}
                      title={clinic.displayName}
                      isFavorited={false}
                      category={constToTitleCase(clinic.category)}
                      rentCostPerDay={clinic.pricePerDay}
                      thumbnailURL={
                        clinic.photos!.find((photo) => photo.isPrimary)?.path ||
                        ""
                      }
                    />
                  </span>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">
                    No clinics found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-2/4">
        <ClinicsMap
          clinics={clinics.map((clinic) => ({
            id: clinic.id,
            name: clinic.displayName,
            latitude: parseFloat(clinic.addressLatitude),
            longitude: parseFloat(clinic.addressLongitude)
          }))}
        />
      </div>
    </div>
  );
}
