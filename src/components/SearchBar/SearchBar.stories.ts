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
    layout: 'padded',
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
        layout: 'padded'
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
      control: { type: 'object' },
      table: {
        type: { summary: 'string[]' }
      }
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
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

/**
 * Mobile layout story for the SearchBar
 * 
 * This story demonstrates how the SearchBar responds to mobile viewport sizes,
 * showing its responsive design capabilities.
 */
export const Mobile: Story = {
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
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      story: {
        inline: true,
        iframeHeight: 500,
      },
      description: {
        story: 'Demonstrates the SearchBar layout on mobile devices, where elements stack vertically.'
      }
    },
  },
};

/**
 * Desktop layout story for the SearchBar
 * 
 * This story demonstrates how the SearchBar appears on desktop viewport sizes,
 * showing its horizontal layout and full functionality.
 */
export const Desktop: Story = {
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
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      story: {
        inline: true,
        iframeHeight: 200
      },
      description: {
        story: 'Demonstrates the SearchBar layout on desktop devices, where elements are arranged horizontally.'
      }
    },
  },
};
