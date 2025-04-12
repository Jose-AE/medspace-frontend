"use client";

import { dateToString, formatDate, stringToDate } from "@/lib/dateUtils";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { FaRegClock } from "react-icons/fa";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => 0 + i);

type RentCalendarProps = {
  /** List of CalendarEvents to render */
  calendarEvents: CalendarEvent[];
  /** Current date to display */
  currentDate: Date;
  /** Callback to change the current date in parent component */
  onChangeCurrentDate: (date: Date) => void;
};

const RentCalendar = ({
  calendarEvents,
  currentDate,
  onChangeCurrentDate
}: RentCalendarProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChangeCurrentDate(stringToDate(e.target.value));
    }
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 justify-between mb-8">
        <p className="capitalize font-medium">
          {formatDate(currentDate, { month: "long" })},{" "}
          {formatDate(weekStart, { day: "2-digit" })}-
          {formatDate(weekEnd, {
            day: "2-digit"
          })}
        </p>
        <input
          className="border-1 p-1 cursor-pointer rounded-sm"
          type="date"
          value={dateToString(currentDate, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}
          onChange={handleDayChange}
        />
      </div>
      <div className="grid grid-cols-[1fr_repeat(7,3fr)] gap-4 mb-4">
        <p className="text-right text-gray-500">Day</p>
        {weekDays.map((day) => (
          <div
            className="flex flex-col justify-center items-center text-gray-500"
            key={day.toString()}
          >
            <p> {formatDate(day, { day: "2-digit" })}</p>
            <p>{formatDate(day, { weekday: "short" })}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_repeat(7,3fr)]">
        <div className="flex flex-col">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-8 border-t text-sm text-right pr-2 text-gray-500"
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {weekDays.map((day, i) => (
          <DayColumn
            key={day.toString()}
            calendarEvents={calendarEvents.filter((event) => {
              const appointmentDate = new Date(event.date);
              return (
                appointmentDate >= day && appointmentDate < addDays(day, 1)
              );
            })}
          />
        ))}
      </div>
    </div>
  );
};

type DayColumnProps = {
  calendarEvents: CalendarEvent[];
};

const DayColumn = ({ calendarEvents }: DayColumnProps) => {
  return (
    <div className="relative">
      {HOURS.map((hour) => (
        <div key={hour} className="h-8 border-t border-gray-200 bg-white"></div>
      ))}
      {calendarEvents.map((event, i) => (
        <CalendarEventCard key={i} event={event} />
      ))}
    </div>
  );
};

type CalendarEventCardProps = {
  event: CalendarEvent;
};

const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
  const startHourParts = event.startTime.split(":");
  const startHour = startHourParts[0];
  const startMinute = startHourParts[1];

  const endHourParts = event.endTime.split(":");
  const endHour = endHourParts[0];
  const endMinute = endHourParts[1];

  const top = parseFloat(startHour) * 2 + parseFloat(startMinute) / 30.0;
  const bottom = parseFloat(endHour) * 2 + parseFloat(endMinute) / 30.0;
  const height = bottom - top;

  return (
    <div
      className={`absolute w-full bg-blue-200 text-white rounded-md flex flex-col justify-between p-2`}
      style={{
        top: `${top}rem`,
        height: `${height}rem`
      }}
    >
      <p className="text-xs text-blue-600 font-bold truncate">{event.title}</p>
      <div className="flex gap-2 items-center">
        <FaRegClock className="fill-blue-600" />
        <p className="text-xs text-blue-600">
          {event.startTime} : {event.endTime}
        </p>
      </div>
      <div className="absolute top-0 left-0 h-full w-1 bg-blue-600 rounded-l-md"></div>
    </div>
  );
};

export default RentCalendar;
