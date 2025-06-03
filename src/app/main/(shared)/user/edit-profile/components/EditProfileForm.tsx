"use client";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import Avatar from "@/components/Avatar/Avatar";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import {
  CreateUserProfileData,
  EditUserProfileData,
  TENANT_SPECIALTIES
} from "@/types/userTypes";
import Button from "@/components/Button";
import { useForm } from "@/hooks/useForm";
import { UserService } from "@/services/UserService";
import toast from "react-hot-toast";
import { StorageService } from "@/services/StorageService";
import Modal from "@/components/Modal";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";

interface FormData
  extends Partial<
    Omit<CreateUserProfileData, "userType" | "tenantLicensePath" | "pfpPath">
  > {
  tenantLicenseFile: File | null;
  pfpFile: File | null;
}

type Props = CreateUserProfileData;

export default function EditProfileForm({
  bio,
  email,
  fullName,
  pfpPath,
  phoneNumber,
  tenantSpecialtyId,
  userType
}: Props) {
  const router = useRouter();

  const { updateFormData: updateOriginalData, formData: originalData } =
    useForm<Omit<Props, "userType">>({
      bio,
      email,
      fullName,
      pfpPath,
      phoneNumber,
      tenantSpecialtyId
    });

  const { updateFormData, formData } = useForm<FormData>({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    bio: bio,
    tenantSpecialtyId: tenantSpecialtyId,
    tenantLicenseFile: null,
    pfpFile: null
  });

  const [previewImage, setPreviewImage] = useState(pfpPath);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function hasChanged(): boolean {
    return (
      formData.fullName !== originalData.fullName ||
      formData.email !== originalData.email ||
      formData.phoneNumber !== originalData.phoneNumber ||
      formData.bio !== originalData.bio ||
      formData.tenantSpecialtyId !== originalData.tenantSpecialtyId ||
      formData.pfpFile !== null
    );
  }

  function handleImageClick() {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function validateInputs(): boolean {
    if (!formData.fullName) {
      toast.error("Invalid full name");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.phoneNumber) {
      toast.error("Please enter valid phone number.");
      return false;
    }

    if (!formData.bio) {
      toast.error("Please enter a short description about you.");
      return false;
    }

    if (formData.bio.length > 500) {
      toast.error("Bio should be max 500 characters.");
      return false;
    }

    return true;
  }

  function handlePfpFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData("pfpFile", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  async function handleDeleteUser() {
    setDeleteModalIsOpen(false);
    setIsDeleteLoading(true);

    try {
      await UserService.deleteUserProfile();
      toast.success("Account deleted successfully");
      await AuthService.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account", error);
      toast.error("Error deleting account");
    } finally {
      setIsDeleteLoading(false);
      setDeleteModalIsOpen(false);
    }
  }

  async function handleSubmit() {
    if (!validateInputs()) return;

    setIsUpdateLoading(true);

    try {
      let newPfpPath = pfpPath;

      if (formData.pfpFile) {
        newPfpPath = await StorageService.uploadImage(
          formData.pfpFile!,
          `user-pfps/${formData.pfpFile?.name}`
        );
      }

      const data: EditUserProfileData = {
        bio: formData.bio!,
        email: formData.email!,
        fullName: formData.fullName!,
        phoneNumber: formData.phoneNumber!,
        tenantSpecialtyId: formData.tenantSpecialtyId,
        pfpPath: newPfpPath
      };

      await UserService.updateUserProfile(data);

      // Update the original data with the new values
      updateOriginalData("bio", formData.bio!);
      updateOriginalData("email", formData.email!);
      updateOriginalData("fullName", formData.fullName!);
      updateOriginalData("phoneNumber", formData.phoneNumber!);
      updateOriginalData("tenantSpecialtyId", formData.tenantSpecialtyId);
      updateOriginalData("pfpPath", newPfpPath); // Update the original data with the new pfpPath
      updateFormData("pfpFile", null); // Reset the pfpFile in the formData

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdateLoading(false);
    }
  }

  return (
    <>
      <Modal
        body={
          <div className="flex flex-col">
            <p className="text-sm">
              This action will delete your account and all its data.
            </p>
            <p className="text-sm mb-2">
              Please note that this action is irreversible.
            </p>
            <div>
              <Button variant="danger" onClick={() => handleDeleteUser()}>
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteModalIsOpen(false);
                }}
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        }
        title="Confirm Account Deletion"
        isOpen={deleteModalIsOpen}
        onClose={() => {
          setDeleteModalIsOpen(false);
        }}
      />

      <div className="max-w-4xl mx-auto mt-10">
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Photo Section - Now aligned left */}
              <div className="flex flex-col items-center gap-2 pt-6 ">
                <label className="text-sm font-medium text-gray-700 ">
                  Profile Photo
                </label>

                <div className="relative inline-block ">
                  <div
                    onClick={handleImageClick}
                    className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 cursor-pointer "
                  >
                    <Avatar
                      imageUrl={previewImage}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handlePfpFileChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click to upload a new photo
                </p>
              </div>

              {/* Form fields take up more space */}
              <div className="md:col-span-2 space-y-4">
                <TextInput
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => {
                    updateFormData("fullName", e.target.value);
                  }}
                />
                <TextInput
                  label="Email"
                  value={formData.email}
                  onChange={(e) => {
                    updateFormData("email", e.target.value);
                  }}
                />
                <TextInput
                  label="Phone Number"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    updateFormData("phoneNumber", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-6 ">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About You
            </h2>
            <div className="space-y-4">
              <TextInput
                label="Bio"
                value={formData.bio}
                isTextArea
                rows={3}
                className="resize-none w-full"
                onChange={(e) => {
                  updateFormData("bio", e.target.value);
                }}
              />

              {userType === "TENANT" && (
                <SelectInput
                  label="Specialty"
                  value={formData.tenantSpecialtyId}
                  values={TENANT_SPECIALTIES.map((specialty, i) => ({
                    name: specialty,
                    value: (i + 1).toString()
                  }))}
                  onChange={(e) => {
                    updateFormData(
                      "tenantSpecialtyId",
                      parseInt(e.target.value)
                    );
                  }}
                />
              )}
            </div>

            <div className="flex justify-between gap-4 mt-10 ">
              <Button
                isLoading={isDeleteLoading}
                variant="danger"
                onClick={() => {
                  setDeleteModalIsOpen(true);
                }}
              >
                Delete Account
              </Button>
              <Button
                disabled={!hasChanged() || isDeleteLoading}
                isLoading={isUpdateLoading}
                onClick={handleSubmit}
                icon={<Check size={18} className="mr-2" />}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
