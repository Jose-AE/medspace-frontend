import { Meta, StoryObj } from "@storybook/react";
import RentCalendar from "./RentCalendar";

const meta: Meta<typeof RentCalendar> = {
  title: "Components/RentCalendar",
  component: RentCalendar,
  tags: ["autodocs"],
  args: {
    calendarEvents: [
      {
        id: "1",
        title: "Consultorio medico moderno",
        date: new Date(),
        startTime: "08:00",
        endTime: "10:00"
      },
      {
        id: "2",
        title: "Appointment at clinic",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        startTime: "15:00",
        endTime: "20:00"
      }
    ],
    currentDate: new Date(),
    onChangeCurrentDate: (date: Date) => {}
  }
};

export default meta;
type Story = StoryObj<typeof RentCalendar>;

export const Default: Story = {};
