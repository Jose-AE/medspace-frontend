import React from "react";
import EditProfileForm from "./components/EditProfileForm";
import { UserService } from "@/services/UserService";

export default async function page() {
  const user = await UserService.fetchCurrentUserProfile();

  if (!user) {
    return <div>Invalid user</div>;
  }

  return (
    <EditProfileForm
      userType={user.userType}
      bio={user.bio}
      email={user.email}
      fullName={user.fullName}
      pfpPath={user.pfpPath}
      phoneNumber={user.phoneNumber}
      tenantSpecialtyId={user.tenantSpecialty?.id}
      tenantLicensePath={user.tenantLicensePath}
    />
  );
}
