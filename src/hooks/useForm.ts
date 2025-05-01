import { useState } from "react";

export function useForm<T>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);

  const updateFormData = (key: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return { formData, updateFormData };
}
