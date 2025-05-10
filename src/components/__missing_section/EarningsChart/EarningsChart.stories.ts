import { Meta, StoryObj } from "@storybook/react";
import EarningsChart from "./EarningsChart";

const meta: Meta<typeof EarningsChart> = {
  title: "Components/Charts/EarningsChart",
  component: EarningsChart,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Chart data points with actual and predicted values"
    }
  }
};

export default meta;
type Story = StoryObj<typeof EarningsChart>;

// Chart with consistently increasing data
export const IncreasingTrend: Story = {
  args: {
    data: [
      { month: "Jan", actual: 3000, predicted: 3200 },
      { month: "Feb", actual: 3500, predicted: 3700 },
      { month: "Mar", actual: 4100, predicted: 4200 },
      { month: "Apr", actual: 4600, predicted: 4800 },
      { month: "May", actual: 5200, predicted: 5400 },
      { month: "Jun", actual: 5800, predicted: 6000 },
      { month: "Jul", actual: 6400, predicted: 6600 },
      { month: "Aug", actual: 7000, predicted: 7500 },
      { month: "Sep", actual: null, predicted: 8000 },
      { month: "Oct", actual: null, predicted: 8500 },
      { month: "Nov", actual: null, predicted: 9000 },
      { month: "Dec", actual: null, predicted: 9500 }
    ]
  }
};

// Chart showing negative growth
export const NegativeGrowth: Story = {
  args: {
    data: [
      { month: "Jan", actual: 12000, predicted: 11800 },
      { month: "Feb", actual: 11500, predicted: 11200 },
      { month: "Mar", actual: 10800, predicted: 10500 },
      { month: "Apr", actual: 10200, predicted: 10000 },
      { month: "May", actual: 9800, predicted: 9500 },
      { month: "Jun", actual: 9500, predicted: 9200 },
      { month: "Jul", actual: 9200, predicted: 8800 },
      { month: "Aug", actual: 8800, predicted: 8500 },
      { month: "Sep", actual: null, predicted: 8200 },
      { month: "Oct", actual: null, predicted: 8000 },
      { month: "Nov", actual: null, predicted: 7800 },
      { month: "Dec", actual: null, predicted: 7500 }
    ]
  }
};

// Chart with fluctuating data
export const FluctuatingTrend: Story = {
  args: {
    data: [
      { month: "Jan", actual: 8000, predicted: 8200 },
      { month: "Feb", actual: 7500, predicted: 7800 },
      { month: "Mar", actual: 9000, predicted: 8900 },
      { month: "Apr", actual: 8200, predicted: 8300 },
      { month: "May", actual: 9500, predicted: 9200 },
      { month: "Jun", actual: 8800, predicted: 9000 },
      { month: "Jul", actual: 10000, predicted: 9800 },
      { month: "Aug", actual: 9500, predicted: 10200 },
      { month: "Sep", actual: null, predicted: 10500 },
      { month: "Oct", actual: null, predicted: 11000 },
      { month: "Nov", actual: null, predicted: 10800 },
      { month: "Dec", actual: null, predicted: 11500 }
    ]
  }
};

// Chart with high variance between actual and predicted
export const HighVariance: Story = {
  args: {
    data: [
      { month: "Jan", actual: 5000, predicted: 7000 },
      { month: "Feb", actual: 5500, predicted: 7500 },
      { month: "Mar", actual: 6000, predicted: 8500 },
      { month: "Apr", actual: 6200, predicted: 9000 },
      { month: "May", actual: 6500, predicted: 10000 },
      { month: "Jun", actual: 7000, predicted: 11000 },
      { month: "Jul", actual: 7200, predicted: 12000 },
      { month: "Aug", actual: 7500, predicted: 13000 },
      { month: "Sep", actual: null, predicted: 14000 },
      { month: "Oct", actual: null, predicted: 15000 },
      { month: "Nov", actual: null, predicted: 16000 },
      { month: "Dec", actual: null, predicted: 17000 }
    ]
  }
};

// Chart with quarterly data only
export const QuarterlyData: Story = {
  args: {
    data: [
      { month: "Q1", actual: 15000, predicted: 16000 },
      { month: "Q2", actual: 18000, predicted: 19000 },
      { month: "Q3", actual: 22000, predicted: 24000 },
      { month: "Q4", actual: null, predicted: 28000 }
    ]
  }
};

// Chart with more actual data and less predicted
export const MostlyActual: Story = {
  args: {
    data: [
      { month: "Jan", actual: 5400, predicted: 6000 },
      { month: "Feb", actual: 6200, predicted: 6800 },
      { month: "Mar", actual: 7100, predicted: 7800 },
      { month: "Apr", actual: 8300, predicted: 9000 },
      { month: "May", actual: 9100, predicted: 9800 },
      { month: "Jun", actual: 10200, predicted: 11000 },
      { month: "Jul", actual: 11500, predicted: 12300 },
      { month: "Aug", actual: 12700, predicted: 13500 },
      { month: "Sep", actual: 13900, predicted: 14800 },
      { month: "Oct", actual: 15200, predicted: 16200 },
      { month: "Nov", actual: null, predicted: 17500 },
      { month: "Dec", actual: null, predicted: 19000 }
    ]
  }
};
