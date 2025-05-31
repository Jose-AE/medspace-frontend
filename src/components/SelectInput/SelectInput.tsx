import { cn } from "@/lib/utils";
import React, { ReactNode, SelectHTMLAttributes } from "react";
import Tooltip from "../Tooltip";
import { MdInfoOutline } from "react-icons/md";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  values: { name: string; value: string }[];
  isInvalid?: boolean;
  invalidMessage?: string;
  label?: string;
  labelTooltip?: ReactNode; // Optional tooltip in label
}

function SelectInput({
  className,
  placeholder,
  isInvalid = false,
  invalidMessage,
  values,
  label,
  labelTooltip,
  ...props
}: Props) {
  return (
    <div className={cn("w-full", className)}>
      <label
        className={cn(
          "mt-4 flex justify-between items-center text-sm font-medium text-gray-800",
          !label && "hidden"
        )}
      >
        {label}
        {labelTooltip && (
          <Tooltip body={labelTooltip}>
            <MdInfoOutline className="ml-2" />
          </Tooltip>
        )}
      </label>

      <select
        {...props}
        className={cn(
          "px-4 py-2 mt-2 w-full",
          "block  text-gray-700 bg-white border border-gray-300",
          "rounded-lg focus:outline-none focus:ring focus:ring-opacity-40",
          isInvalid
            ? " border-red-500  focus:border-red-500 focus:ring-red-500 "
            : "focus:border-primary-400  focus:ring-primary-300"
        )}
      >
        {placeholder && <option value={""}>{placeholder}</option>}
        {values.map((v, i) => (
          <option key={i} value={v.value}>
            {v.name}
          </option>
        ))}
      </select>
      {isInvalid && (
        <p
          className={cn(
            "text-red-500 text-sm mt-2",
            !invalidMessage && "hidden"
          )}
        >
          {invalidMessage}
        </p>
      )}
    </div>
  );
}

export default SelectInput;
