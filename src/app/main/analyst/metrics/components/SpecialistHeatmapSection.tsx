import Heatmap from './MaplibreHeatmap';
import SelectInput from '@/components/SelectInput';
import { ExternalClinicService } from '@/services/ExternalClinicService';
import { ExternalClinicSpecialty, MexicoCityBorough, BoroughCenter } from '@/types/externalClinicTypes';
import { ChangeEvent, useEffect, useState } from 'react';

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export default function SpecialistHeatmapSection() {
  const [selectedBorough, setSelectedBorough] = useState<MexicoCityBorough | ''>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<ExternalClinicSpecialty | ''>('');
  const [heatmapData, setHeatmapData] = useState<HeatmapDataPoint[]>([]);
  const [mapCenter, setMapCenter] = useState<BoroughCenter>({ lat: 19.4326, lng: -99.1332, zoom: 10 });

  const clinicService = ExternalClinicService.getInstance();

  useEffect(() => {
    const data = clinicService.getHeatmapData({
      borough: selectedBorough || undefined,
      specialty: selectedSpecialty || undefined
    });
    setHeatmapData(data);

    // Update map center when borough changes
    if (selectedBorough) {
      setMapCenter(clinicService.getBoroughCenter(selectedBorough));
    } else {
      setMapCenter({ lat: 19.4326, lng: -99.1332, zoom: 10 });
    }
  }, [selectedBorough, selectedSpecialty]);

  // Convert the service data to your select options
  const boroughOptions = [
    { name: 'All Boroughs', value: '' },
    ...clinicService.getBoroughs().map(borough => ({
      name: borough,
      value: borough
    }))
  ];

  const specialtyOptions = [
    { name: 'All Specialties', value: '' },
    ...clinicService.getSpecialties().map(specialty => ({
      name: specialty,
      value: specialty
    }))
  ];

  const handleBoroughChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBorough(e.target.value as MexicoCityBorough | '');
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value as ExternalClinicSpecialty | '');
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Specialist Concentration by Area</h2>
          <p className="text-gray-600 mb-4">Heat map showing the distribution of medical specialists across Mexico City boroughs.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-4/5 xl:w-2/3">
            <div className="w-full sm:w-1/2">
              <SelectInput 
                values={boroughOptions} 
                defaultValue="" 
                onChange={handleBoroughChange}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <SelectInput 
                values={specialtyOptions} 
                defaultValue="" 
                onChange={handleSpecialtyChange}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[400px]">
          <Heatmap 
            data={heatmapData} 
            center={mapCenter}
          />
        </div>
      </div>
    </section>
  );
} 