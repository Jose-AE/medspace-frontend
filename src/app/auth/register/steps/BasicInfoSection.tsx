import SelectInput from "@/components/SelectInput/SelectInput";
import TextInput from "@/components/TextInput";
import { UserRegistrationData } from "@/types/userTypes";
import React from "react";

type CreateUserFormData = Partial<UserRegistrationData>;

interface Props {
  formData: CreateUserFormData;
  updateFormData: (
    key: keyof CreateUserFormData,
    value: CreateUserFormData[keyof CreateUserFormData]
  ) => void;
}

export default function BasicInfoSection({ formData, updateFormData }: Props) {
  return (
    <div className="w-full p-6 m-auto mx-auto   dark:bg-gray-800">
      <form>
        <TextInput
          label="Full Name:"
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData("fullName", e.target.value)}
        />

        <TextInput
          label="Email:"
          invalidMessage="Invalid email"
          type="text"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
        />

        <TextInput
          label="Password:"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
        />

        <TextInput
          type="number"
          label="Phone Number:"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData("phoneNumber", e.target.value)}
        />

        <SelectInput
          label="User Type:"
          values={[
            { name: "Tenant", value: "TENANT" },
            { name: "Landlord", value: "LANDLORD" },
            { name: "Analyst", value: "ANALYST" }
          ]}
          value={formData.userType}
          onChange={(e) => updateFormData("userType", e.target.value)}
        />
      </form>
    </div>
  );
}
