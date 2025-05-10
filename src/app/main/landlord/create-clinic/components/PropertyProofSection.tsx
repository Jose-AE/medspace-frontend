import StepSectionBase, { StepSectionProps } from "./StepSectionBase";

interface PropertyProofSectionProps extends StepSectionProps {
  isSubmitting: boolean;
}

export default function PropertyProof({
  onClickPrimary,
  onClickSecondary,
  isSubmitting
}: PropertyProofSectionProps) {
  return (
    <StepSectionBase
      onClickPrimary={onClickPrimary}
      onClickSecondary={onClickSecondary}
      isActionDisabled={isSubmitting}
      primaryLabel="Submit"
      secondaryLabel="Back"
    >
      <p>Property Proof Section</p>
    </StepSectionBase>
  );
}
