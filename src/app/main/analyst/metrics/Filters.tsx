import { useEffect, useState } from 'react';
import { CityDropdown } from './CityDropdown';
import { CategoryDropdown } from './CategoryDropdown';
import { ClinicService } from '@/services/ClinicService';
import SectionCards from './components/MetricsCard';

export default function Filters() {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [clinicCount, setClinicCount] = useState<number | null>(null);

  // Cargar conteo total al inicio
  useEffect(() => {
    if (!selectedCity && !selectedCategory) {
      ClinicService.getTotalClinicsCount()
        .then(setClinicCount)
        .catch(console.error);
    }
  }, [selectedCity, selectedCategory]);

  useEffect(() => {
    if (selectedCity || selectedCategory) {
      ClinicService.getClinicsCount({ city: selectedCity, category: selectedCategory })
        .then(setClinicCount)
        .catch(console.error);
    }
  }, [selectedCity, selectedCategory]);

  const cardsData = [
    {
      title: 'Clinics that match your filters',
      value: clinicCount !== null ? clinicCount.toString() : 'Cargando...'
    }
  ];

  return (
    <div>
      <CityDropdown selected={selectedCity} onSelect={setSelectedCity} />
      <CategoryDropdown selected={selectedCategory} onSelect={setSelectedCategory} />
      <SectionCards data={cardsData} />
    </div>
  );
}
