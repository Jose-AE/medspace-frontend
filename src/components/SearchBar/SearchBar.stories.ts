/**
 * SearchBar Stories
 * 
 * This file contains the Storybook stories for the SearchBar component.
 * The stories demonstrate different states and configurations of the SearchBar.
 * 
 * @module SearchBar
 */

import { Meta, StoryObj } from "@storybook/react";
import SearchBar from "./SearchBar";

/**
 * Meta configuration for the SearchBar stories
 * 
 * @type {Meta<typeof SearchBar>}
 */
const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A search component for finding medical appointments',
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
    previewTabs: {
      canvas: { hidden: false },
      'storybook/docs/panel': { hidden: false },
    },
    docs: {
      description: {
        component: 'The SearchBar allows users to search for medical appointments by location, date, and time. It includes a location dropdown, date picker, and time picker with various states and configurations.',
      },
      source: { type: 'dynamic' },
      canvas: {
        sourceState: 'shown',
      },
      story: {
        inline: true,
        iframeHeight: 500,
      },
    },
  },
  argTypes: {
    defaultLocation: {
      description: 'Default selected location',
      control: 'text',
    },
    defaultDate: {
      description: 'Default selected date in YYYY-MM-DD format',
      control: 'text',
    },
    defaultTime: {
      description: 'Default selected time in HH:mm format',
      control: 'text',
    },
    locations: {
      description: 'List of available locations to choose from',
      control: 'object',
    },
    onLocationChange: {
      description: 'Callback when location selection changes',
      action: 'location changed',
    },
    onDateChange: {
      description: 'Callback when date selection changes',
      action: 'date changed',
    },
    onTimeChange: {
      description: 'Callback when time selection changes',
      action: 'time changed',
    },
    onSearch: {
      description: 'Callback when search is triggered with all parameters',
      action: 'search triggered',
    },
    isLoading: {
      description: 'Whether the component is in a loading state',
      control: 'boolean',
    },
    isDisabled: {
      description: 'Whether the component is disabled',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Example cities for the stories
const exampleCities = [
  "CDMX",
  "Monterrey",
  "Guadalajara",
  "Puebla",
  "Tijuana",
  "Mérida",
  "Cancún",
  "Querétaro"
];

/**
 * Default story for the SearchBar
 * 
 * This story demonstrates the default state of the SearchBar with all props provided.
 * It shows a complete search interface with location, date, and time selection.
 */
export const Default: Story = {
  args: {
    locations: exampleCities,
    defaultLocation: "CDMX",
    defaultDate: new Date().toISOString().split('T')[0],
    defaultTime: "12:00",
    onLocationChange: (location) => {
      console.log('Location changed:', location);
    },
    onDateChange: (date) => {
      console.log('Date changed:', date);
    },
    onTimeChange: (time) => {
      console.log('Time changed:', time);
    },
    onSearch: (params) => {
      alert(`Searching for appointments in ${params.location} on ${params.date} at ${params.time}`);
    },
  },
  parameters: {
    docs: {
      story: {
        inline: true,
        iframeHeight: 500,
      },
    },
  },
};

/**
 * Empty state story for the SearchBar
 * 
 * This story demonstrates the SearchBar with no default values.
 */
export const Empty: Story = {
  args: {
    locations: exampleCities,
    defaultLocation: "",
    defaultDate: "",
    defaultTime: "",
    onLocationChange: (location) => {
      console.log('Location changed:', location);
    },
    onDateChange: (date) => {
      console.log('Date changed:', date);
    },
    onTimeChange: (time) => {
      console.log('Time changed:', time);
    },
    onSearch: (params) => {
      alert(`Searching for appointments in ${params.location} on ${params.date} at ${params.time}`);
    },
  },
  parameters: {
    docs: {
      story: {
        inline: true,
        iframeHeight: 500,
      },
    },
  },
};

/**
 * Custom locations story for the SearchBar
 * 
 * This story demonstrates the SearchBar with a custom set of locations.
 */
export const CustomLocations: Story = {
  args: {
    locations: ["New York", "Los Angeles", "Chicago", "Miami"],
    defaultLocation: "New York",
    defaultDate: new Date().toISOString().split('T')[0],
    defaultTime: "09:00",
    onLocationChange: (location) => {
      console.log('Location changed:', location);
    },
    onDateChange: (date) => {
      console.log('Date changed:', date);
    },
    onTimeChange: (time) => {
      console.log('Time changed:', time);
    },
    onSearch: (params) => {
      alert(`Searching for appointments in ${params.location} on ${params.date} at ${params.time}`);
    },
  },
  parameters: {
    docs: {
      story: {
        inline: true,
        iframeHeight: 500,
      },
    },
  },
};
