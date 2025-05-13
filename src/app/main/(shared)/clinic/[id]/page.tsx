import { ClinicService } from "@/services/ClinicService";
import { WEEK_DAY_NUMBERS } from "@/types/clinicTypes";
import { getUserServerSide } from "@/components/AuthGuard/AuthGuard";
import TitleSection from "./components/TitleSection";
import PhotoSection from "./components/PhotoSection";
import LandlordInfoSection from "./components/LandlodrdInfoSection";
import DescriptionSection from "./components/DescriptionSection";
import EquipmentSection from "./components/EquipmentSection";
import AvailabilitySection from "./components/AvailabilitySection";
import LocationSection from "./components/LocationSection";
import ReviewsSection from "./components/ReviewsSection";
import ReserveCard from "./components/ReserveCard";

export default async function ClinicPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userType = (await getUserServerSide())?.userType;

  // Fetch clinic data using the id
  const clinicData = await ClinicService.getClinicById(id, {
    includeAvailabilities: true,
    includeEquipments: true,
    includePhotos: true
  });

  if (!clinicData) {
    return <div>Clinic not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <main className="p-4">
        {/* Title Section - Shared */}
        <TitleSection
          city=""
          rating={clinicData?.averageRating}
          title={clinicData.displayName}
        />

        {/* Photo Gallery - Shared */}
        <PhotoSection photos={clinicData.photos || []} />

        <div
          className={`flex flex-wrap ${userType === "TENANT" ? "" : "w-full"}`}
        >
          {/* Main Content Area */}
          <div
            className={`${userType === "TENANT" ? "w-full lg:w-8/12 pr-0 lg:pr-6" : "w-full pr-0"}`}
          >
            {/* Landlord Info - Shared */}
            <LandlordInfoSection
              landlordData={{
                averageRating: 5,
                createdAt: new Date(),
                fullName: "Osdaddy",
                id: 0,
                reviews: [],
                pfpPath: "",
                bio: "s",
                tenantSpecialty: {
                  id: 1,
                  name: "DENTAL"
                },
                userType: "LANDLORD"
              }}
            />

            {/* Description - Shared */}
            <DescriptionSection description={clinicData.description} />

            {/* Equipment - Shared */}
            <EquipmentSection equipment={clinicData.equipments || []} />

            {/* Availability - Shared */}
            <AvailabilitySection availabilities={clinicData.availabilities!} />

            {/* Location - Shared */}
            <LocationSection
              coordinates={{
                latitude: parseFloat(clinicData?.addressLatitude),
                longitude: parseFloat(clinicData?.addressLongitude)
              }}
            />

            {/* Reviews - Shared */}
            <ReviewsSection
              reviews={[
                {
                  rating: 5,
                  body: "Great place!",
                  createdAt: new Date(),
                  userName: "John Doe",
                  userPfpPath: ""
                },
                {
                  rating: 1,
                  body: "Great place!",
                  createdAt: new Date(),
                  userName: "John Doe",
                  userPfpPath: ""
                }
              ]}
            />
          </div>

          {/* Tenant-specific */}
          {userType === "TENANT" && (
            <ReserveCard
              costPerDay={clinicData.pricePerDay}
              clinicName={clinicData.displayName}
              clinicId={clinicData.id}
              availibility={{
                form: clinicData.availableFromDate,
                to: clinicData.availableToDate,
                occupiedDates: clinicData.occupiedDates,
                weekdays:
                  clinicData.availabilities?.map(
                    (a) => WEEK_DAY_NUMBERS[a.weekDay]
                  ) || []
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
