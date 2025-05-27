import { Meta, StoryObj } from "@storybook/react";
import UploadPhoto from "./UploadPhoto";


const meta: Meta<typeof UploadPhoto> = {
  title: "Components/UploadPhoto",
  component: UploadPhoto,
  tags: ["autodocs"],
};


export default meta;
type Story = StoryObj<typeof UploadPhoto>;


export const Default: Story = {};
