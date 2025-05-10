import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import EarningsTimeGraph from "./EarningsTime";

const meta: Meta<typeof EarningsTimeGraph> = {
  title: "Components/EarningsTimeGraph",
  component: EarningsTimeGraph,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EarningsTimeGraph>;

const sampleEarningsData = [
  { label: "Jan", earnings: 20 },
  { label: "Feb", earnings: 25 },
  { label: "Mar", earnings: 30 },
  { label: "Apr", earnings: 45 },
  { label: "May", earnings: 40 },
  { label: "Jun", earnings: 42 },
  { label: "Jul", earnings: 45 },
];

export const Default: Story = {
  args: {
    data: sampleEarningsData,
    predictedPercentage: 30,
  },
};

export const WithPredictedData: Story = {
  args: {
    data: sampleEarningsData,
    predictedPercentage: 50,
  },
};

export const NoData: Story = {
  args: {
    data: [],
    predictedPercentage: 30,
  },
};
