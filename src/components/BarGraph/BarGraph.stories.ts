import { Meta, StoryObj } from "@storybook/react";
import ComparisonChart from "./BarGraph";


const meta: Meta<typeof ComparisonChart> = {
  title: "Components/BarGraph",
  component: ComparisonChart,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof ComparisonChart>;


export const Default: Story = {};
