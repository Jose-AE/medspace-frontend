"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import DatePicker from "@/components/DatePicker";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { RentRequestService } from "@/services/RentRequestService";

interface Props {
  costPerDay: number;
  clinicName: string;
  clinicId: number;
  availibility: {
    form: Date;
    to: Date;
    weekdays?: number[];
    occupiedDates?: Date[];
  };
}

export default function ReserveCard({
  costPerDay,
  clinicName,
  clinicId,
  availibility
}: Props) {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");

  const totalCost = costPerDay * selectedDays.length;

  function handleCloseModal() {
    if (isLoading) return;
    setIsOpen(false);
  }

  function handleOpenModal() {
    if (selectedDays.length === 0) {
      toast.error("Please select at least one day to reserve.");
      return;
    }

    setIsOpen(true);
  }

  async function handleReserve() {
    setIsLoading(true);
    // Handle the reserve logic here

    try {
      await RentRequestService.sendRentRequest(clinicId, comment, selectedDays);
      toast.success("Reservation request sent successfully");
    } catch (error) {
      console.error("Error  reservation request:", error);
      toast.error("Failed to send reservation request");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <>
      <Modal
        className="max-w-7xl "
        isOpen={isOpen}
        onClose={handleCloseModal}
        body={
          <div>
            <p className="text-lg font-semibold mb-4">Rent Request</p>
            <p className="text-gray-600 mb-4">
              You&apos;re about to request a reservation for <b>{clinicName}</b>
              . Please review the selected dates below and add an optional
              comment before submitting. You’ll receive a notification once the
              owner reviews your request. If approved, you’ll be charged the
              total amount.
            </p>

            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Selected Dates:</p>
              {selectedDays.length > 0 ? (
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2 bg-white">
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {selectedDays.map((date, index) => (
                      <li key={index}>{format(date, "dd MMMM yyyy")}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No dates selected.
                </p>
              )}
            </div>

            <p className="text-sm font-medium mb-1">
              Leave a Comment (optional)
            </p>

            <TextInput
              rows={4}
              isTextArea
              className="resize-none"
              placeholder="Optional comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Total:</p>
              <div className="text-lg italic font-semibold text-gray-800">
                {totalCost} MXN
              </div>
            </div>

            <div className="flex flex-row gap-2 mt-4">
              <Button
                className="w-1/2"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="w-1/2"
                onClick={handleReserve}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </div>
          </div>
        }
      />
      <div className="w-full lg:w-4/12 mt-6 lg:mt-0 ">
        <div className="border border-gray-300 rounded-lg p-6 shadow-md sticky top-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xl font-bold">
                {costPerDay || "10"} MXN
              </span>
              <span className="text-gray-600"> / day</span>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <div className="border border-gray-300 rounded-md mb-4 overflow-hidden cursor-pointer">
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <div className="p-2">
                    <p
                      className={`text-xs text-gray-500 ${
                        selectedDays.length > 0 && "mb-2"
                      }`}
                    >
                      {selectedDays.length > 0
                        ? "Selected Days"
                        : "Select Days"}
                    </p>
                    <div className="flex flex-row gap-1">
                      {selectedDays.map((day, i) => (
                        <p
                          key={i}
                          className="font-medium bg-gray-100 px-2 rounded-md"
                        >
                          {format(day, "dd/MM/yyyy")}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <DatePicker
                mode="multiple"
                enabledDaysOfWeek={availibility.weekdays || []}
                fromDate={availibility.form}
                toDate={availibility.to}
                selectedDate={selectedDays}
                disabledDates={availibility.occupiedDates || []}
                onSelectDate={(days) => {
                  setSelectedDays(days || []);
                }}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="primary"
            onClick={handleOpenModal}
            className="w-full py-3 font-medium mb-4"
          >
            Reserve
          </Button>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="underline">
                {costPerDay} MXN x {selectedDays.length} Days
              </span>
            </div>
            <div className="border-t border-gray-300 pt-4 font-bold flex justify-between">
              <span>Total</span>
              <span>{totalCost} MXN</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
