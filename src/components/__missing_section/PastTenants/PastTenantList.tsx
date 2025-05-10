import { FC } from "react";
import PastTenantCard, { PastTenant } from "./PastTenantCard";

interface PastTenantListProps {
  tenants: PastTenant[];
}

const PastTenantList: FC<PastTenantListProps> = ({ tenants }) => {
  if (tenants.length === 0) {
    return <p className="text-gray-500">No past tenants available.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {tenants.map((tenant) => (
        <PastTenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
};

export default function PastTenantsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Past Tenants</h1>
      <PastTenantList tenants={[]} />
    </main>
  );
}
