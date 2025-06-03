"use client";
import { RentRequestPreview } from "@/types/rentRequestTypes";
import RentCalendar from "./RentCalendar";

interface CalendarDisplayProps {
  rentRequests: RentRequestPreview[];
}

export default function CalendarDisplay({
  rentRequests
}: CalendarDisplayProps) {
  return <RentCalendar rentRequests={rentRequests} />;
}
