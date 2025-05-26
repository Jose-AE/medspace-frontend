import { ReactNode, useId } from "react";

interface Props {
  body: ReactNode;
  children: ReactNode;
}

export default function Tooltip({ body, children }: Props) {
  const tooltipId = useId();

  return (
    <div className="relative group inline-flex items-center justify-center">
      <span aria-describedby={tooltipId}>{children}</span>

      <div
        role="tooltip"
        id={tooltipId}
        className={`
          pointer-events-none absolute left-1/2 top-full mt-1 w-max -translate-x-1/2 
          scale-95 opacity-0 transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100 z-10
        `}
      >
        <div className="flex flex-col items-center">
          <div className="rounded border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-md">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
