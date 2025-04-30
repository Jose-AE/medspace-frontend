'use client';
import SectionCards from "@/components/MetricsCard";
import Heatmap from "@/components/Heatmap";
import Button from "@/components/Button";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import SelectInput from "@/components/SelectInput";
import DashboardTabs from "@/components/DashboardTabs";

// Mock data - this will be replaced with real API calls later
const mockMetrics = [
  {
    title: "Total Specialists",
    value: "45",
    trend: "+5",
    trendDirection: "up" as const,
    footerTitle: "From last month",
    footerDescription: "5 new specialists joined"
  },
  {
    title: "Total Clinics",
    value: "12",
    trend: "+2",
    trendDirection: "up" as const,
    footerTitle: "From last month",
    footerDescription: "2 new clinics added"
  },
  {
    title: "Total Patients",
    value: "1,250",
    trend: "+150",
    trendDirection: "up" as const,
    footerTitle: "From last month",
    footerDescription: "150 new patients registered"
  },
  {
    title: "Active Cases",
    value: "320",
    trend: "+25",
    trendDirection: "up" as const,
    footerTitle: "From last month",
    footerDescription: "25 new active cases"
  }
];

// Create a simpler heatmap data structure
const mockHeatmapData = Array(7).fill(null).map(() => 
  Array(24).fill(null).map(() => ({
    lat: 19.4326 + (Math.random() * 0.2 - 0.1), // Random latitude around Mexico City center
    lng: -99.1332 + (Math.random() * 0.2 - 0.1), // Random longitude around Mexico City center
    intensity: Math.random()
  }))
);

// Add select options data
const regionOptions = [
  { name: "All Regions", value: "" },
  { name: "North Region", value: "north" },
  { name: "South Region", value: "south" },
  { name: "East Region", value: "east" },
  { name: "West Region", value: "west" },
  { name: "Central Region", value: "central" }
];

const specialtyOptions = [
  { name: "All Specialties", value: "" },
  { name: "Cardiology", value: "cardiology" },
  { name: "Neurology", value: "neurology" },
  { name: "Pediatrics", value: "pediatrics" },
  { name: "Orthopedics", value: "orthopedics" },
  { name: "Dermatology", value: "dermatology" }
];

export default function MetricsPage() {
  const handleDownloadCSV = () => {
    // TODO: Implement CSV download
    console.log('Downloading CSV...');
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...');
  };

  const handleTabChange = (tab: string) => {
    // TODO: Handle tab change
    console.log('Tab changed to:', tab);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Metrics Overview */}
      <section className="mb-8">
        <SectionCards data={mockMetrics} />
      </section>

      {/* Dashboard Navigation and Actions */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
        {/* Navigation Tabs - Container with controlled width */}
        <div className="w-full sm:max-w-[600px]">
          <DashboardTabs onTabChange={handleTabChange} />
        </div>

        {/* Action Buttons - Always maintain their natural width */}
        <div className="flex gap-4 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleDownloadCSV} 
            className="flex-1 sm:flex-initial bg-white shadow-lg border-gray-200" 
            icon={<HiOutlineDocumentArrowDown />}
          >
            Download CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadPDF} 
            className="flex-1 sm:flex-initial bg-white shadow-lg border-gray-200" 
            icon={<HiOutlineDocumentText />}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Activity Heatmap */}
      <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Specialist Concentration by Area</h2>
            <p className="text-gray-600 mb-4">Heat map showing the distribution of medical specialists across different regions.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-4/5 xl:w-2/3">
              <div className="w-full sm:w-1/2">
                <SelectInput
                  values={regionOptions}
                  defaultValue=""
                />
              </div>
              
              <div className="w-full sm:w-1/2">
                <SelectInput
                  values={specialtyOptions}
                  defaultValue=""
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[300px]">
            <Heatmap data={mockHeatmapData.flat()} />
          </div>
        </div>
      </section>
    </main>
  );
} 