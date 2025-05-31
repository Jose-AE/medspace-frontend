import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    Object.keys(initialData).reduce(
      (acc, key) => {
        acc[key as keyof T] = "";
        return acc;
      },
      {} as Record<keyof T, string>
    )
  );

  const setError = (key: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const clearError = (key: keyof T) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const updateFormData = (key: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return { formData, updateFormData, errors, setError, clearError };
}
