import Heatmap from '@/components/Heatmap/MaplibreHeatmap';
import SelectInput from '@/components/SelectInput';

const regionOptions = [
  { name: 'All Regions', value: '' },
  { name: 'Coyoacán', value: 'coyoacan' },
  { name: 'Álvaro Obregón', value: 'alvaro_obregon' },
  { name: 'Benito Juárez', value: 'benito_juarez' },
  // ...add more regions as needed
];

const specialtyOptions = [
  { name: 'All Specialties', value: '' },
  { name: 'Cardiology', value: 'cardiology' },
  { name: 'Neurology', value: 'neurology' },
  { name: 'Pediatrics', value: 'pediatrics' },
  { name: 'Orthopedics', value: 'orthopedics' },
  { name: 'Dermatology', value: 'dermatology' },
  // ...add more specialties as needed
];

// Placeholder/mock data for now
const mockHeatmapData = [
  { lat: 19.4326, lng: -99.1332, intensity: 0.9 },
  { lat: 19.44, lng: -99.15, intensity: 0.7 },
  { lat: 19.42, lng: -99.12, intensity: 0.8 },
  { lat: 19.45, lng: -99.14, intensity: 1.0 },
  { lat: 19.43, lng: -99.11, intensity: 0.5 },
];

export default function SpecialistHeatmapSection() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-2">Specialist Concentration by Area</h2>
          <p className="text-gray-600 mb-4">Heat map showing the distribution of medical specialists across different regions.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-4/5 xl:w-2/3">
            <div className="w-full sm:w-1/2">
              <SelectInput values={regionOptions} defaultValue="" />
            </div>
            <div className="w-full sm:w-1/2">
              <SelectInput values={specialtyOptions} defaultValue="" />
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[400px]">
          <Heatmap data={mockHeatmapData} />
        </div>
      </div>
    </section>
  );
} 