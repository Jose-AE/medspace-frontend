'use client';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { useState } from 'react';

interface DashboardTabsProps {
  /** Callback function when tab changes */
  onTabChange?: (tab: string) => void;
  /** Default selected tab */
  defaultTab?: string;
  /** Additional CSS classes */
  className?: ClassValue;
}

const tabs = [
  { id: 'specialist', label: 'Specialist Concentration' },
  { id: 'clinic', label: 'Clinic Demand' },
  { id: 'disease', label: 'Disease Prevalence' }
] as const;

export default function DashboardTabs({ 
  onTabChange,
  defaultTab = 'specialist',
  className
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={cn(
      "w-full bg-gray-50 rounded-lg px-2 py-2",
      "flex flex-col sm:flex-row",
      "gap-1 sm:gap-2",
      "mb-4 sm:mb-6",
      className
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            'w-full sm:w-auto',
            'px-7 py-2',
            'text-sm',
            'font-medium',
            'rounded-lg',
            'transition-colors',
            'whitespace-nowrap',
            'truncate',
            'h-10',
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-lg border border-gray-200'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 