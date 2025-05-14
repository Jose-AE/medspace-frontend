import SelectInput from "@/components/SelectInput/SelectInput";
import TextInput from "@/components/TextInput";
import React from "react";
import { CreateUserFormData } from "../page";

interface Props {
  formData: CreateUserFormData;
  updateFormData: (
    key: keyof CreateUserFormData,
    value: CreateUserFormData[keyof CreateUserFormData]
  ) => void;
}

export default function BasicInfoSection({ formData, updateFormData }: Props) {
  return (
    <div className="w-full p-6 m-auto mx-auto  ">
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
          labelTooltip={
            <ul>
              <li>
                <strong>Landlord:</strong> Publish your clinics for tenants to
                rent.
              </li>
              <li>
                <strong>Tenant:</strong> Rent clinics from a landlord for
                medical use.
              </li>
              <li>
                {" "}
                <strong>Analyst:</strong>Access dashboards displaying various
                insights about the medical real estate market.{" "}
              </li>
            </ul>
          }
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
