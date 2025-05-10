"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

import { DateRange, DayPicker, Matcher } from "react-day-picker";
import "react-day-picker/style.css";

interface BaseProps {
  fromDate?: Date;
  toDate?: Date;
  className?: ClassValue;
  disabledDates?: Date[];
  enabledDaysOfWeek?: number[];
}

type Props =
  | ({
      mode: "single";
      selectedDate: Date | undefined;
      onSelectDate: (date: Date | undefined) => void;
    } & BaseProps)
  | ({
      mode: "multiple";
      selectedDate: Date[] | undefined;
      onSelectDate: (date: Date[] | undefined) => void;
    } & BaseProps)
  | ({
      mode: "range";
      selectedDate: DateRange | undefined;
      onSelectDate: (range: DateRange | undefined) => void;
    } & BaseProps);

export default function DatePicker({
  mode,
  onSelectDate,
  fromDate,
  toDate,
  disabledDates,
  className,
  selectedDate,
  enabledDaysOfWeek = []
}: Props) {
  const allWeekDays = [0, 1, 2, 3, 4, 5, 6];

  const disabledDaysOfWeek = allWeekDays.filter(
    (day) => !enabledDaysOfWeek.includes(day)
  );

  return (
    <div
      className={cn(
        "w-fit rounded-2xl border border-gray-300 p-4 shadow-md bg-white",
        className
      )}
    >
      {mode === "single" && (
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={[
            {
              dayOfWeek: enabledDaysOfWeek.length > 0 ? disabledDaysOfWeek : []
            },
            { before: fromDate, after: toDate } as Matcher,
            ...(disabledDates || [])
          ]}
        />
      )}
      {mode === "multiple" && (
        <DayPicker
          mode="multiple"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={[
            {
              dayOfWeek: enabledDaysOfWeek.length > 0 ? disabledDaysOfWeek : []
            },
            { before: fromDate, after: toDate } as Matcher,
            ...(disabledDates || [])
          ]}
        />
      )}
      {mode === "range" && (
        <DayPicker
          mode="range"
          selected={selectedDate}
          onSelect={onSelectDate}
          disabled={[
            {
              dayOfWeek: enabledDaysOfWeek.length > 0 ? disabledDaysOfWeek : []
            },
            { before: fromDate, after: toDate } as Matcher,
            ...(disabledDates || [])
          ]}
        />
      )}
    </div>
  );
}
