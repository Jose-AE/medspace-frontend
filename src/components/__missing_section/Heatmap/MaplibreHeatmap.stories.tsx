import type { Meta, StoryObj } from "@storybook/react";
import CDMXHeatmap from "./MaplibreHeatmap";

const meta: Meta<typeof CDMXHeatmap> = {
  title: "Components/CDMXHeatmap",
  component: CDMXHeatmap,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof CDMXHeatmap>;

export const Default: Story = {
  args: {
    data: [
      { lat: 19.4326, lng: -99.1332, intensity: 0.9 },
      { lat: 19.44, lng: -99.15, intensity: 0.7 },
      { lat: 19.42, lng: -99.12, intensity: 0.8 },
      { lat: 19.45, lng: -99.14, intensity: 1.0 },
      { lat: 19.43, lng: -99.11, intensity: 0.5 }
    ]
  }
};
