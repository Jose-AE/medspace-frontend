import { useEffect, useState } from "react";
import { ClinicService, CityOption } from "@/services/ClinicService";

export function CityDropdown({
  onSelect,
  selected
}: {
  onSelect: (value: string) => void;
  selected?: string;
}) {
  const [cities, setCities] = useState<CityOption[]>([]);

  useEffect(() => {
    ClinicService.getCitiesWithClinics().then(setCities).catch(console.error);
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="border text-sm rounded w-[100]"
    >
      <option value="">Select a city</option>
      {cities.map((city) => (
        <option key={city.value} value={city.value}>
          {city.label}
        </option>
      ))}
    </select>
  );
}
