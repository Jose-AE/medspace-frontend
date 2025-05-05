import { RiVerifiedBadgeFill } from "react-icons/ri";
import { UserCompact } from "@/types/userTypes";
import Avatar from "@/components/Avatar/Avatar";
import { format } from "date-fns";
import { StorageService } from "@/services/StorageService";

interface Props {
  landlordData: UserCompact;
}

export default async function LandlodrdInfoSection({ landlordData }: Props) {
  return (
    <div className="flex items-start mb-6 flex-row">
      <div className="mr-4">
        <Avatar
          className="w-16 h-16"
          imageUrl={
            (await StorageService.getFileUrl(landlordData?.profilePhotoUrl)) ||
            ""
          }
        />
      </div>
      <div>
        <h3 className="font-medium">
          Hosted by {landlordData?.fullName || "Osdaddy"}
        </h3>
        <p className="text-gray-500 text-sm">
          Joined {format(landlordData?.createdAt || new Date(), "MMMM yyyy")}
        </p>
        <div className="flex items-center mt-2">
          <div className="flex items-center mr-3">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{landlordData?.averageRating || "5.0"}</span>
          </div>
          <div className="flex items-center">
            <RiVerifiedBadgeFill className="w-4 h-4 mr-1 text-primary" />
            <span>Identity verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
