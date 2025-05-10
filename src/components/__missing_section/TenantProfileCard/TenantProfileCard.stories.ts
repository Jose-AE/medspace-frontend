/**
 * TenantProfileCard Stories
 * 
 * This file contains the Storybook stories for the TenantProfileCard component.
 * The stories demonstrate different states and configurations of the TenantProfileCard.
 * 
 * @module TenantProfileCard
 */

import { Meta, StoryObj } from "@storybook/react";
import TenantProfileCard from "./TenantProfileCard";

/**
 * Meta configuration for the TenantProfileCard stories
 * 
 * @type {Meta<typeof TenantProfileCard>}
 */
const meta: Meta<typeof TenantProfileCard> = {
  title: "Components/TenantProfileCard",
  component: TenantProfileCard,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A card component that displays tenant profile information',
    docs: {
      description: {
        component: 'The TenantProfileCard displays key information about a tenant including their image, name, specialty, contact details, rating, and rental history. It supports both primary and public variants.',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'image-alt',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    tenantImageURL: {
      description: 'URL of the tenant\'s profile image',
      control: 'text',
    },
    tenantName: {
      description: 'Full name of the tenant',
      control: 'text',
    },
    tenantSpeciality: {
      description: 'Professional specialty or field of the tenant',
      control: 'text',
    },
    tenantPhoneNumber: {
      description: 'Contact phone number of the tenant',
      control: 'text',
    },
    tenantEmail: {
      description: 'Contact email of the tenant',
      control: 'text',
    },
    tenantRating: {
      description: 'Numerical rating of the tenant (0-5)',
      control: {
        type: 'number',
        min: 0,
        max: 5,
        step: 0.5,
      },
    },
    numberOfRentAgreements: {
      description: 'Total number of rent agreements the tenant has',
      control: {
        type: 'number',
        min: 0,
      },
    },
    tenantBiography: {
      description: 'Professional biography or description of the tenant',
      control: 'text',
    },
    onClickEdit: {
      description: 'Callback function when edit button is clicked',
      action: 'clicked',
    },
    variant: {
      description: 'Visual variant of the card',
      control: 'select',
      options: ['primary', 'public'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TenantProfileCard>;

/**
 * Primary story for the TenantProfileCard
 * 
 * This story demonstrates the default state of the TenantProfileCard with all props provided.
 * It shows a complete tenant profile with image, contact information, rating, and edit functionality.
 */
export const Primary: Story = {
  args: {
    tenantImageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tenantName: "Carlos Páez",
    tenantSpeciality: "Cardiologist",
    tenantRating: 4.5,
    numberOfRentAgreements: 30,
    tenantPhoneNumber: "5523456789",
    tenantEmail: "carlos@gmail.com",
    tenantBiography: "Dr. Carlos Paez is a board-certified cardiologist with over 10 years of experience in preventive cardiology and patient-centered care. Trusted by hundreds, he offers expert consultations and diagnoses.",
    onClickEdit: () => alert("Edit clicked"),
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary variant of the TenantProfileCard with all information displayed and edit functionality enabled.',
      },
    },
  },
};

/**
 * Public story for the TenantProfileCard
 * 
 * This story demonstrates the public variant of the TenantProfileCard without edit functionality.
 * It shows a complete tenant profile with image, contact information, and rating.
 */
export const Public: Story = {
  args: {
    tenantImageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tenantName: "Carlos Páez",
    tenantSpeciality: "Cardiologist",
    tenantRating: 4.5,
    numberOfRentAgreements: 30,
    tenantPhoneNumber: "5523456789",
    tenantEmail: "carlos@gmail.com",
    tenantBiography: "Dr. Carlos Paez is a board-certified cardiologist with over 10 years of experience in preventive cardiology and patient-centered care. Trusted by hundreds, he offers expert consultations and diagnoses.",
    onClickEdit: () => alert("Edit clicked"),
    variant: "public",
  },
  parameters: {
    docs: {
      description: {
        story: 'The public variant of the TenantProfileCard without edit functionality, suitable for public viewing.',
      },
    },
  },
};