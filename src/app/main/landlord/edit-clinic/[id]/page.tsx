import EditForm from "./components/EditForm";
import { ClinicService } from "@/services/ClinicService";

export default async function ClinicPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinic = await ClinicService.getClinicById(id, {
    includePhotos: false,
    includeEquipments: false,
    includeAvailabilities: false
  });

  if (!clinic) {
    return <div>Clinic not found</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col mt-10  ">
      <h1 className="text-4xl font-bold mb-8">Edit Clinic</h1>
      <EditForm clinicId={Number(id)} placeholders={clinic} />
    </div>
  );
}
