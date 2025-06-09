interface Props {
  selected: string | undefined;
  onSelect: (value: string | undefined) => void;
}

const categories = [
  { label: "Dentist", value: "dentist" },
  { label: "Dermatological", value: "dermatological" },
  { label: "Pediatric", value: "pediatric" },
  { label: "Surgical", value: "surgical" },
  { label: "General purpose", value: "general_purpose" }
];

export function CategoryDropdown({ selected, onSelect }: Props) {
  return (
    <select
      value={selected ?? ""}
      onChange={(e) => onSelect(e.target.value || undefined)}
      className="text-sm border  rounded"
    >
      <option value="">Select a category</option>
      {categories.map((cat) => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  );
}
