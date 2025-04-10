"use client";

type ClinicAvailabilityInputProps = {
  /** Day of the week */
  dayOfWeek: string;
  /** Clinic from availability time */
  fromTime: string | null;
  /** Clinic to availability time */
  toTime: string | null;
  /** Whether the clinic is available on this day */
  isActive: boolean;
  /** Callback to update the from time */
  onChangeFromTime: (time: string) => void;
  /** Callback to update the to time */
  onChangeToTime: (time: string) => void;
  /** Callback to update the active state */
  onChangeActive: (isActive: boolean) => void;
  /** Error message */
  error?: string | null;
};

const ClinicAvailabilityInput = ({
  dayOfWeek,
  fromTime = null,
  toTime = null,
  onChangeFromTime,
  onChangeToTime,
  isActive,
  onChangeActive,
  error = null,
}: ClinicAvailabilityInputProps) => {
  return (
    <>
      {error && isActive && (
        <div className="text-red-500 text-sm font-medium mb-2">{error}</div>
      )}
      <div
        className={`flex flex-1 flex-col gap-8 p-2 items-center justify-between shadow-[0_0_5px_rgba(0,0,0,0.1)] rounded-sm md:flex-row md:justify-between md:px-6 md:py-2 ${
          !isActive && "opacity-50 bg-gray-200"
        } ${error && isActive && "border-1 border-red-500"}`}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id={`day-checkbox-${dayOfWeek}`}
            checked={isActive}
            onChange={(e) => onChangeActive(e.target.checked)}
          />
          <label
            className="text-md font-semibold text-gray-700 dark:text-gray-200"
            htmlFor={`day-checkbox-${dayOfWeek}`}
          >
            {dayOfWeek}
          </label>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="flex gap-3">
            <label
              className="text-md font-semibold text-gray-700 dark:text-gray-200"
              htmlFor={`from-${dayOfWeek}`}
            >
              From:
            </label>
            <input
              disabled={!isActive}
              type="time"
              id={`from-${dayOfWeek}`}
              value={isActive && fromTime ? fromTime : ""}
              onChange={(e) => onChangeFromTime(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <label
              className="text-md font-semibold text-gray-700 dark:text-gray-200"
              htmlFor={`to-${dayOfWeek}`}
            >
              To:
            </label>
            <input
              disabled={!isActive}
              type="time"
              id={`to-${dayOfWeek}`}
              value={isActive && toTime ? toTime : ""}
              onChange={(e) => {
                onChangeToTime(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicAvailabilityInput;
