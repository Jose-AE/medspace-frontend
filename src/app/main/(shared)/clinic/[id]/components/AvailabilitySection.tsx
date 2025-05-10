import { constToTitleCase } from "@/lib/textUtils";
import { ClinicAvailability, WEEK_DAYS } from "@/types/clinicTypes";
import React from "react";

interface Props {
  availabilities: ClinicAvailability[];
}

export default function AvailabilitySection({ availabilities }: Props) {
  function formatTime(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const availabilityTimes = WEEK_DAYS.map((day, index) => {
    const availability = availabilities?.filter((a) => a.weekDay === day);

    if (availability?.length) {
      return (
        <div
          key={index}
          className="mb-4 rounded-xl border border-gray-300 bg-white p-5 shadow-sm "
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {constToTitleCase(day)}
          </h3>
          <div className="space-y-1">
            {availability.map((avail) => (
              <div key={avail.id} className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">From:</span>{" "}
                {formatTime(avail.startTime)}{" "}
                <span className="font-medium text-gray-700">to</span>{" "}
                {formatTime(avail.endTime)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  });

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Available Times</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availabilityTimes}
      </div>
    </div>
  );
}
