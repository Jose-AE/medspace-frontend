import { Meta, StoryObj } from "@storybook/react";
import RentCalendar from "./RentCalendar";

const meta: Meta<typeof RentCalendar> = {
  title: "Components/RentCalendar",
  component: RentCalendar,
  tags: ["autodocs"],
  args: {
    rentRequests: [
      {
        id: 1,
        clinicDisplayName: "Consultorio medico moderno",
        clinicId: 1,
        clinicAddress: "Calle Falsa 123",
        clinicMainPhotoPath: "/images/clinic1.jpg",
        startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        status: "ACCEPTED",
        comments: "Aceptado",
        tenantId: 1,
        tenantFullName: "Juan Perez",
        tenantProfilePictureUrl: "/images/user1.jpg",
        tenantSpecialty: "Cardiologia",
        endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        requestedDays: [
          new Date(new Date().setDate(new Date().getDate() + 1)),
          new Date(new Date().setDate(new Date().getDate() + 2))
        ],
        clinicAvailabilities: [
          {
            id: 1,
            clinicId: 1,
            weekDay: "MONDAY",
            startTime: "08:00",
            endTime: "10:00"
          },
          {
            id: 2,
            clinicId: 1,
            weekDay: "TUESDAY",
            startTime: "15:00",
            endTime: "20:00"
          },
          {
            id: 3,
            clinicId: 1,
            weekDay: "WEDNESDAY",
            startTime: "08:00",
            endTime: "10:00"
          },
          {
            id: 4,
            clinicId: 1,
            weekDay: "THURSDAY",
            startTime: "15:00",
            endTime: "20:00"
          },
          {
            id: 5,
            clinicId: 1,
            weekDay: "FRIDAY",
            startTime: "08:00",
            endTime: "10:00"
          }
        ]
      }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof RentCalendar>;

export const Default: Story = {};
