import FileInput from "@/components/FileInput";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { TENANT_SPECIALTIES } from "@/types/userTypes";
import { constToTitleCase } from "@/lib/textUtils";
import { CreateUserFormData } from "../page";

interface Props {
  formData: CreateUserFormData;
  updateFormData: (
    key: keyof CreateUserFormData,
    value: CreateUserFormData[keyof CreateUserFormData]
  ) => void;
}

export default function DocumentsSection({ formData, updateFormData }: Props) {
  const [pfpPreview, setPfpPreview] = useState<string>("/pfp_placeholder.png");

  return (
    <div className="w-full p-6 m-auto mx-auto">
      <form className="space-y-4">
        <div className=" flex items-center justify-center ">
          <Avatar className={"size-20"} imageUrl={pfpPreview!} />
        </div>

        <FileInput
          accept="image/*"
          label="Upload Profile Picture"
          placeholder={formData.pfpFile?.name}
          onChange={(files) => {
            if (!files) return;
            updateFormData("pfpFile", files[0]);
            setPfpPreview(URL.createObjectURL(files[0]));
          }}
        />

        <FileInput
          label="Upload Official ID Card"
          placeholder={formData.officialIdFile?.name}
          onChange={(files) => {
            if (!files) return;
            updateFormData("officialIdFile", files[0]);
          }}
        />

        <TextInput
          isTextArea
          rows={2}
          label="Short description about you:"
          value={formData.bio}
          className="resize-none"
          onChange={(e) => updateFormData("bio", e.target.value)}
        />

        {formData.userType === "TENANT" && (
          <>
            <SelectInput
              label="Specialty:"
              values={TENANT_SPECIALTIES.map((s, i) => {
                return {
                  name: constToTitleCase(s),
                  value: (i + 1).toString()
                };
              })}
              value={formData.tenantSpecialtyId}
              onChange={(e) =>
                updateFormData("tenantSpecialtyId", parseInt(e.target.value))
              }
            />

            <TextInput
              label="Professional License Number:"
              type="number"
              value={formData.tenantLicenseNumber}
              onChange={(e) =>
                updateFormData("tenantLicenseNumber", e.target.value)
              }
            />

            <FileInput
              placeholder={formData.tenantLicenseFile?.name}
              label="Upload Professional License"
              onChange={(files) => {
                if (!files) return;
                updateFormData("tenantLicenseFile", files[0]);
              }}
            />
          </>
        )}
      </form>
    </div>
  );
}
