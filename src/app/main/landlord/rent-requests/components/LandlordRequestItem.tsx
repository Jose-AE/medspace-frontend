"use client";
import Button from "@/components/Button";
import React from "react";
import Image from "@/components/Image";
import { dateToString } from "@/lib/dateUtils";

interface LandlordRequestItemProps {
  specialistName: string;
  date: Date;
  officeName: string;
  onClickAccept: () => void;
  onClickDeny: () => void;
  specialistPhoto?: string;
}

const RequestDetails = ({
  specialistName,
  date,
  specialistPhoto
}: {
  specialistName: string;
  date: Date;
  specialistPhoto?: string;
}) => (
  <div className="flex items-center space-x-2">
    {specialistPhoto && (
      <Image
        placeholderImage="/pfp_placeholder.png"
        src={specialistPhoto}
        alt="Specialist photo"
        className="h-8 w-8 rounded-full object-cover"
        width={32}
        height={32}
      />
    )}
    <div className="flex flex-col">
      <strong className="text-base font-medium">{specialistName}</strong>
      <small className="text-gray-500 text-sm">{dateToString(date)}</small>
    </div>
  </div>
);

const RequestActions = ({
  onClickAccept,
  onClickDeny
}: {
  onClickAccept: () => void;
  onClickDeny: () => void;
}) => (
  <div className="flex gap-2">
    <Button onClick={onClickAccept} variant="primary">
      Accept
    </Button>
    <Button onClick={onClickDeny} variant="danger">
      Deny
    </Button>
  </div>
);

const LandlordRequestItem: React.FC<LandlordRequestItemProps> = ({
  specialistName,
  date,
  officeName,
  onClickAccept,
  onClickDeny,
  specialistPhoto
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg w-full max-w-6xl mx-auto">
      <RequestDetails
        specialistName={specialistName}
        date={date}
        specialistPhoto={specialistPhoto}
      />
      <div className="flex-1 ml-4 text-gray-700">{officeName}</div>
      <RequestActions onClickAccept={onClickAccept} onClickDeny={onClickDeny} />
    </div>
  );
};

export default LandlordRequestItem;
