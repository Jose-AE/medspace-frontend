// components/PastTenantCard.tsx
import ClinicComparison from "./ClinicComparison";

const GraphCard = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[380px] mt-4 h-[500px] flex items-center justify-center  p-2">
    <div className="border border-gray-300 rounded-lg my-1  shadow-sm  bg-white flex items-center flex-col justify-between w-full">
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

export default function GraphCardVisualization() {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-12 p-12 items-start">
        <GraphCard>
          <ClinicComparison />
        </GraphCard>
      </div>
    </div>
  );
}
