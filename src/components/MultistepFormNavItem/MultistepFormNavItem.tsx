import { FaAngleRight } from "react-icons/fa6";

import { cn } from "@/lib/utils";

type MultistepFormNavItemProps = {
  /** The step number of the item */
  stepNumber: number;
  /** The label of the item */
  label: string;
  /** The fill type of the item */
  fill: boolean;
  /** Show the right arrow */
  arrow?: boolean;
};

const MultistepFormNavItem = ({
  stepNumber,
  label,
  fill,
  arrow = true,
}: MultistepFormNavItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn(
          "bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium",
          fill ? "bg-blue-500 text-white" : "bg-blue-50 text-black"
        )}
      >
        {stepNumber}
      </div>
      <p>{label}</p>
      {arrow && <FaAngleRight />}
    </div>
  );
};

export default MultistepFormNavItem;
