import { Meta, StoryObj } from "@storybook/react";
import MapInput from "./MapInput";

const meta: Meta<typeof MapInput> = {
  title: "Components/MapInput",
  component: MapInput,
  tags: ["autodocs"],
  args: {
    defaultCoordinates: {
      latitude: 19.43121854346279,
      longitude: -99.132390928256
    },
    mapStyleURL: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
  },
  argTypes: {
    defaultCoordinates: {
      control: "object"
    },

    mapStyleURL: {
      control: "text"
    },
    onLocationChange: {
      action: "locationChanged"
    },
    className: {
      table: {
        disable: true
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof MapInput>;

export const Default: Story = {};

export const CustomStyle: Story = {
  args: {
    mapStyleURL: "https://tiles.stadiamaps.com/styles/stamen_terrain.json"
  }
};

export const WithoutUserLocation: Story = {};

export const WithPrintOnChangeLocation: Story = {
  args: {
    onLocationChange: (coords) => console.log("New location:", coords)
  }
};
