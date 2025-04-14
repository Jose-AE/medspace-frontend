import { Meta, StoryObj } from "@storybook/react";
import DoctorInformation from "./DoctorInformation";


const meta: Meta<typeof DoctorInformation> = {
  title: "Components/DoctorInformation",
  component: DoctorInformation,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof DoctorInformation>;


export const Default: Story = {};
