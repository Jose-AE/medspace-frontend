'use client';
import SectionCards from "@/components/MetricsCard";
import Button from "@/components/Button";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import DashboardTabs from "@/components/DashboardTabs";
import { useState } from "react";
import SpecialistHeatmapSection from "./components/SpecialistHeatmapSection";
import DiseasePrevalenceSection from "./components/DiseasePrevalenceSection";
import ClinicDemandDashboardSection from "./components/ClinicDemandDashboardSection";

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

export default function MetricsPage() {
  const [activeTab, setActiveTab] = useState('specialist');

  const handleDownloadCSV = () => {
    // TODO: Implement CSV download
    console.log('Downloading CSV...');
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'specialist':
        return <SpecialistHeatmapSection />;
      case 'clinic':
        return <ClinicDemandDashboardSection />;
      case 'disease':
        return <DiseasePrevalenceSection />;
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Metrics Overview */}
      <section className="mb-8">
        <SectionCards data={mockMetrics} />
      </section>

      {/* Dashboard Navigation and Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start justify-between gap-4 gap-y-2 mb-8">
        {/* Navigation Tabs - Container with controlled width */}
        <div className="w-full sm:max-w-[600px]">
          <DashboardTabs onTabChange={handleTabChange} defaultTab={activeTab} />
        </div>

        {/* Action Buttons - Always maintain their natural width */}
        <div className="flex gap-4 w-full sm:w-auto py-2">
          <Button 
            variant="outline" 
            onClick={handleDownloadCSV} 
            className="flex-1 sm:flex-initial bg-white shadow-lg border-gray-200 py-2 px-4 text-sm text-gray-800"
            icon={<HiOutlineDocumentArrowDown />}
          >
            Download CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownloadPDF} 
            className="flex-1 sm:flex-initial bg-white shadow-lg border-gray-200 py-2 px-4 text-sm text-gray-800"
            icon={<HiOutlineDocumentText />}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      {renderDashboardContent()}
    </main>
  );
} 