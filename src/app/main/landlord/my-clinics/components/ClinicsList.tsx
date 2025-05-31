"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ClinicService } from "@/services/ClinicService";
import { ClinicPreview } from "@/types/clinicTypes";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import ClinicListItem from "./ClinicListItem";

interface Props {
  clinics: ClinicPreview[];
}

export default function ClinicsList({ clinics }: Props) {
  const router = useRouter();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [clinicIdToDelete, setClinicIdToDelete] = React.useState<number | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  function handleDelete(clinicId: number) {
    setClinicIdToDelete(clinicId);
    setDeleteModalIsOpen(true);
  }

  function handleEdit(clinicId: number) {
    router.push(`/main/landlord/my-clinics/${clinicId}/edit`);
  }

  async function handleShare(clinicId: number) {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Consultorio médico en renta",
          text: "Consulta este espacio disponible",
          url: window.location.href.replace(
            "landlord/my-clinics",
            `clinic/${clinicId}`
          )
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }

  async function handleDeleteConfirm() {
    if (!clinicIdToDelete) return;

    setDeleteLoading(true);

    try {
      await ClinicService.deleteClinicById(clinicIdToDelete);
      setDeleteModalIsOpen(false);
      toast.success("Clinic deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Error deleting clinic. Please try again later.");
      console.error("Error deleting clinic:", error);
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleDeleteCancel() {
    setDeleteModalIsOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Modal
        body={
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              This action will delete the clinic and all its data.
            </p>
            <div>
              <Button
                variant="danger"
                isLoading={deleteLoading}
                onClick={() => handleDeleteConfirm()}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        }
        title="Delete clinic"
        isOpen={deleteModalIsOpen}
        onClose={() => {
          setDeleteModalIsOpen(false);
        }}
      />

      {clinics.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <p className="text-lg font-semibold">
            You don&apos;t have any clinics
          </p>
          <p className="text-sm text-gray-500">
            You can create a new clinic by clicking the <b>Create</b> above.
          </p>
        </div>
      )}

      {clinics.map((clinic, i) => (
        <ClinicListItem
          key={i}
          clinicId={clinic.id}
          clinicImageURL={clinic.mainPhotoPath}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onShare={handleShare}
          clinicName={clinic.displayName}
          clinicLocation={clinic.addressState}
        />
      ))}
    </div>
  );
}
