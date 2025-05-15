"use client";

import { dateToString, formatDate, stringToDate } from "@/lib/dateUtils";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
import { FaRegClock } from "react-icons/fa";

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  variant: "FUTURE" | "PAST";
}

const HOURS = Array.from({ length: 24 }, (_, i) => 0 + i);

type RentCalendarProps = {
  /** List of accepted rent request to render */
  rentRequests: RentRequestPreview[];
};

const RentCalendar = ({ rentRequests }: RentCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  const WEEKDAY_MAP = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6
  };

  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    return rentRequests.flatMap((request) => {
      return request.requestedDays
        .map((day) => {
          const weekDay = new Date(day).getDay();
          const availability = request.clinicAvailabilities.find(
            (availability) => weekDay === WEEKDAY_MAP[availability.weekDay]
          );

          if (!availability) {
            return null;
          }

          return {
            id: request.id,
            title: request.clinicDisplayName,
            date: day,
            startTime: availability.startTime,
            endTime: availability.endTime,
            variant: addDays(day, 1) <= new Date() ? "PAST" : "FUTURE"
          } as CalendarEvent;
        })
        .filter((event): event is CalendarEvent => event !== null);
    });
  }, [rentRequests]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCurrentDate(stringToDate(e.target.value));
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
          className="border-1 border-gray-300  p-1 cursor-pointer rounded-md"
          type="date"
          value={dateToString(currentDate)}
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
              className="h-6 border-t text-sm text-right pr-2 text-gray-500"
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {weekDays.map((day) => (
          <DayColumn
            key={day.toString()}
            calendarEvents={calendarEvents.filter((event) => {
              const appointmentDate = stringToDate(event.date.toString());
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
        <div key={hour} className="h-6 border-t border-gray-200 bg-white"></div>
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

  const top = parseFloat(startHour) * 1.5 + parseFloat(startMinute) / 30.0;
  const bottom = parseFloat(endHour) * 1.5 + parseFloat(endMinute) / 30.0;
  const height = bottom - top;

  const isFuture = event.variant === "FUTURE";
  const backgroundColor = isFuture ? "bg-primary-200" : "bg-gray-200";
  const textColor = isFuture ? "text-primary" : "text-gray-500";
  const clockColor = isFuture ? "fill-primary" : "fill-gray-500";
  const borderColor = isFuture ? "bg-primary" : "bg-gray-200";

  return (
    <div
      className={`absolute w-full ${backgroundColor} text-white rounded-md flex flex-col justify-between p-2`}
      style={{
        top: `${top}rem`,
        height: `${height}rem`
      }}
    >
      <p className={`text-xs ${textColor} font-bold truncate`}>{event.title}</p>
      <div className="flex gap-2 items-center">
        <FaRegClock className={clockColor} />
        <p className={`text-xs ${textColor}`}>
          {startHour}:{startMinute} - {endHour}:{endMinute}
        </p>
      </div>
      <div
        className={`absolute top-0 left-0 h-full w-1 ${borderColor} rounded-l-md`}
      ></div>
    </div>
  );
};

export default RentCalendar;
