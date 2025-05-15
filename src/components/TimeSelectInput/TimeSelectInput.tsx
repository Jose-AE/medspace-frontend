interface TimeSelectInputProps {
  /** The value of time in format hh:mm */
  value: string | null;
  /** Callback to update the time */
  onChange: (time: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
}

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = ["00", "30"];

function formatTime(hour: string, minute: string) {
  return `${hour}:${minute}`;
}

export default function TimeSelectInput({
  value,
  onChange,
  disabled
}: TimeSelectInputProps) {
  const [hour, minute] = value?.split(":") ?? ["12", "00"];

  return (
    <div className="flex space-x-1 items-center">
      <select
        disabled={disabled}
        value={hour}
        onChange={(e) => onChange(formatTime(e.target.value, minute))}
        className="border border-gray-300 rounded-md p-1 text-sm"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        disabled={disabled}
        value={minute}
        onChange={(e) => onChange(formatTime(hour, e.target.value))}
        className="border border-gray-300 rounded-md p-1 text-sm"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
