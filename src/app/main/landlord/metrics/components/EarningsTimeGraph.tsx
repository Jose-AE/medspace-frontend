// Dashboard.tsx

import { PastTenant } from "@/components/__missing_section/PastTenants/PastTenantCard";
import PastTenantList from "@/components/__missing_section/PastTenants/PastTenantList";

import EarningsTimeGraph from "./EarningsTime";

const GraphCard = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[380px] mt-10 h-[500px] flex items-center justify-center  p-2">
    <div className="border rounded-lg my-1  shadow-sm p-4 bg-white flex items-center flex-col justify-between w-full">
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

const sampleEarningsData = [];
export default function EarningsTimeVisualization() {
  return (
    <div className="grid-cols-1 md:grid-cols-3 gap-4">
      <GraphCard>
        <EarningsTimeGraph data={[]} predictedPercentage={30} />
      </GraphCard>
    </div>
  );
}
