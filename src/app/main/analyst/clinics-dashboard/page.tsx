import SectionCards from "@/components/MetricsCard/MetricsCard";
import Heatmap from "@/components/Heatmap";

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
    lat: Math.random() * 180 - 90,
    lng: Math.random() * 360 - 180,
    intensity: Math.random()
  }))
);

export default function ClinicsDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your healthcare network performance</p>
      </div>

      {/* Metrics Overview */}
      <section className="mb-8">
        <SectionCards data={mockMetrics} />
      </section>

      {/* Activity Heatmap */}
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Network Activity</h2>
        <Heatmap data={mockHeatmapData.flat()} />
      </section>
    </main>
  );
} 