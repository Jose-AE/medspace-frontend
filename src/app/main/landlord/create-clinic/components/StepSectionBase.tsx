import Button from "@/components/Button";
import { CreateClinicFormData } from "@/hooks/useCreateClinicForm";

interface StepSectionBaseProps {
  children?: React.ReactNode;
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  isActionDisabled?: boolean;
}

export interface StepSectionProps {
  onClickPrimary: () => void;
  onClickSecondary: () => void;
  data: CreateClinicFormData;
  setData: (
    key: keyof CreateClinicFormData,
    value: CreateClinicFormData[keyof CreateClinicFormData]
  ) => void;
  errors: Record<keyof CreateClinicFormData, string>;
  setError: (field: keyof CreateClinicFormData, message: string) => void;
  clearError: (field: keyof CreateClinicFormData) => void;
}

export default function StepSectionBase({
  children,
  onClickPrimary,
  onClickSecondary,
  primaryLabel,
  secondaryLabel,
  isActionDisabled = false
}: StepSectionBaseProps) {
  return (
    <section className="max-w-4xl mx-auto flex flex-col">
      <div className="min-h-[45vh]">{children}</div>
      <div className="flex mt-10 justify-around">
        <Button variant="outline" className="w-1/3" onClick={onClickSecondary}>
          {secondaryLabel}
        </Button>
        <Button
          className="w-1/3"
          onClick={onClickPrimary}
          disabled={isActionDisabled}
          isLoading={isActionDisabled}
        >
          {primaryLabel}
        </Button>
      </div>
    </section>
  );
}
