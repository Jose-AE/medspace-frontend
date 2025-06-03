"use client";
import SectionCards from "./components/MetricsCard";
import Button from "@/components/Button";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi2";
import DashboardTabs from "./components/DashboardTabs";
import { useState } from "react";
import DiseasePrevalenceSection from "./components/DiseasePrevalenceSection";
import ClinicDemandDashboardSection from "./components/ClinicDemandDashboardSection";
import SpecialistHeatmapSection from "./components/SpecialistHeatmapSection";

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
  const [activeTab, setActiveTab] = useState("specialist");

  const handleDownloadCSV = () => {
    const rows = [
      [
        "Title",
        "Value",
        "Trend",
        "Trend Direction",
        "Footer Title",
        "Footer Description"
      ],
      ...mockMetrics.map((m) => [
        m.title,
        m.value,
        m.trend,
        m.trendDirection,
        m.footerTitle,
        m.footerDescription
      ])
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => {
            const v = String(value);
            if (v.includes(",") || v.includes('"') || v.includes("\n")) {
              return `"${v.replace(/"/g, '""')}"`;
            }
            return v;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    // Create a style element for print
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-content, .print-content * {
          visibility: visible;
        }
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
        
          display: none !important;
        }
        /* Add some print-specific styling */
        .print-content {
          padding: 20px;
        }
        /* Ensure charts and visualizations are properly sized for print */
        .print-content canvas, 
        .print-content svg {
          max-width: 100% !important;
          height: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Find the active dashboard content
    const activeContent = document.querySelector(
      `[data-dashboard-tab="${activeTab}"]`
    );
    if (!activeContent) {
      console.error("Active dashboard content not found");
      return;
    }

    // Add print class to the active content
    activeContent.classList.add("print-content");

    // Hide elements we don't want to print
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("no-print"));

    // Set up cleanup handler
    const cleanup = () => {
      document.head.removeChild(style);
      activeContent.classList.remove("print-content");
      buttons.forEach((button) => button.classList.remove("no-print"));
      window.removeEventListener("afterprint", cleanup);
    };

    // Add event listener for after print
    window.addEventListener("afterprint", cleanup);

    // Trigger print
    window.print();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "specialist":
        return (
          <div data-dashboard-tab="specialist">
            <SpecialistHeatmapSection />
          </div>
        );
      case "clinic":
        return (
          <div data-dashboard-tab="clinic">
            <ClinicDemandDashboardSection />
          </div>
        );
      case "disease":
        return (
          <div data-dashboard-tab="disease">
            <DiseasePrevalenceSection />
          </div>
        );
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
