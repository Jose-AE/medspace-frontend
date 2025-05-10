import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import GraphCardVisualization from "./ClinicComparisonGraph";

const meta: Meta<typeof GraphCardVisualization> = {
  title: "Components/GraphCardVisualization",
  component: GraphCardVisualization
};

export default meta;

type Story = StoryObj<typeof GraphCardVisualization>;

export const Default: Story = {
  args: {}
};
