import React from "react";
import SectionCards, { MetricCardData } from "./MetricsCard";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SectionCards> = {
  title: "Components/MetricsCard",
  component: SectionCards,
};

export default meta;

type Story = StoryObj<typeof SectionCards>;

const sampleData: MetricCardData[] = [
  {
    title: "Monthly Revenue",
    value: "$10,500",
    trend: "+5.2%",
    trendDirection: "up",
    trendIcon: <TrendingUp className="w-3 h-3" />,
    footerTitle: "Revenue Growth",
    footerDescription: "Compared to last month",
  },
  {
    title: "Lost Clients",
    value: "120",
    trend: "-3.1%",
    trendDirection: "down",
    trendIcon: <TrendingDown className="w-3 h-3" />,
    footerTitle: "Client Loss",
    footerDescription: "Retention efforts needed",
  },
];

export const Default: Story = {
  render: () => <SectionCards />,
};

export const WithData: Story = {
  render: () => <SectionCards data={sampleData} />,
};

export const EmptyState: Story = {
  render: () => <SectionCards data={[]} />,
};
