"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import { CgSpinner } from "react-icons/cg";
import { Toggle } from "@radix-ui/react-toggle";
import { TbHeart, TbHeartOff } from "react-icons/tb";
import { CLINIC_EQUIPMENTS, ClinicEquipmentType } from "@/types/clinicTypes";
import { constToTitleCase } from "@/lib/textUtils";
import DatePicker from "@/components/DatePicker";

interface SearchParams {
  location: string;
  date: Date | undefined;
  time: string;
  equipment: ClinicEquipmentType[];
  showSaved: boolean;
}

interface Props {
  /** Default location value */
  defaultLocation?: string;
  /** Default date value */
  defaultDate?: Date;
  /** Default time value */
  defaultTime?: string;
  /** List of available locations */
  locations?: string[];
  /** List of available equipment options */
  equipmentOptions?: {
    id: string;
    name: string;
  }[];
  /** Callback when search is clicked */
  onSearch: (searchParams: SearchParams) => void;
  /** Whether the component is in a loading state */
  isLoading?: boolean;
}

export default function ClinicFilterBar({
  locations = [
    "Mexico City",
    "State of Mexico",
    "Jalisco",
    "Nuevo León",
    "Puebla",
    "Guanajuato",
    "Baja California",
    "Chihuahua",
    "Veracruz",
    "Quintana Roo"
  ],

  defaultLocation,
  defaultTime,
  defaultDate,
  isLoading,
  equipmentOptions = CLINIC_EQUIPMENTS.map((eq, i) => ({
    id: i + "",
    name: eq
  })),
  onSearch
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState(
    defaultLocation || locations[0]
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultDate || undefined
  );
  const [selectedHour, setSelectedHour] = useState(
    defaultTime?.split(":")[0] || "12"
  );
  const [selectedMinute, setSelectedMinute] = useState(
    defaultTime?.split(":")[1] || "00"
  );

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const [showSaved, setShowSaved] = useState(false);

  const handleEquipmentToggle = (equipmentId: string, checked: boolean) => {
    const newSelectedEquipment = checked
      ? [...selectedEquipment, equipmentId]
      : selectedEquipment.filter((id) => id !== equipmentId);

    setSelectedEquipment(newSelectedEquipment);
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = ["00", "30"];

  function formatTime(hour: string, minute: string) {
    return `${hour}:${minute}`;
  }

  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric"
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  function handleDateChange(date: Date | Date[] | undefined) {
    setSelectedDate(date as Date);
  }

  function handleSearch() {
    const formattedTime = formatTime(selectedHour, selectedMinute);
    const searchParams: SearchParams = {
      location: selectedLocation,
      date: selectedDate,
      time: formattedTime,
      equipment: selectedEquipment.map(
        (id) => equipmentOptions.find((eq) => eq.id === id)?.name
      ) as ClinicEquipmentType[],
      showSaved: showSaved
    };
    onSearch(searchParams);
  }

  return (
    <div
      className={`flex items-center bg-white rounded-full shadow-sm px-2 py-2 space-x-2 w-fit ${isLoading && "pointer-events-none"} `}
    >
      {/* Location Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1 ">
            {selectedLocation}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 bg-white border border-gray-300 rounded-md shadow-lg space-y-1">
          {locations.map((loc) => (
            <div
              key={loc}
              className={`cursor-pointer px-2 py-1 rounded-md  ${
                selectedLocation === loc
                  ? "font-semibold text-primary-500  bg-primary-50"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </div>
          ))}
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1">
            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <DatePicker
            mode="single"
            onSelectDate={handleDateChange}
            selectedDate={selectedDate}
          />
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Time Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1">
            {formatTime(selectedHour, selectedMinute)}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-4 bg-white border border-gray-300 rounded-md shadow-lg space-y-2">
          <div className="flex space-x-2 ">
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span className="flex items-center">:</span>
            <select
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(e.target.value)}
              className="border  border-gray-300 rounded-md p-1 w-full"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Equipment Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1">
            <span className="flex items-center gap-1">
              <span>Equipment</span>
              {selectedEquipment.length > 0 && (
                <span className="text-xs text-gray-500">
                  ({selectedEquipment.length})
                </span>
              )}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10">
          <div className="max-h-60 overflow-y-auto">
            {equipmentOptions.map((equipment) => (
              <div
                key={equipment.id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() =>
                  handleEquipmentToggle(
                    equipment.id,
                    !selectedEquipment.includes(equipment.id)
                  )
                }
              >
                <input
                  type="checkbox"
                  id={equipment.id}
                  checked={selectedEquipment.includes(equipment.id)}
                  onChange={(e) =>
                    handleEquipmentToggle(equipment.id, e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-[#1D8BF9] focus:ring-[#1D8BF9]"
                />
                <label className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                  {constToTitleCase(equipment.name)}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-gray-300" />

      {/* Fav*/}
      <Toggle
        onPressedChange={setShowSaved}
        className="flex items-center justify-center gap-2 select-none cursor-pointer text-sm font-medium text-black hover:bg-gray-100 rounded-xl px-2 py-1 w-fit"
      >
        {showSaved ? "Include Saved" : "Exclude Saved"}
        {showSaved ? (
          <TbHeart className="w-4 h-4" />
        ) : (
          <TbHeartOff className="w-4 h-4" />
        )}
      </Toggle>

      {/* Search Button */}

      <button
        disabled={isLoading}
        className={`bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full cursor-pointer`}
        onClick={handleSearch}
      >
        {isLoading ? <CgSpinner className="animate-spin" /> : <FiSearch />}
      </button>
    </div>
  );
}
