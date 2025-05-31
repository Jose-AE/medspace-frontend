import { TrendingUp, TrendingDown } from "lucide-react";

export interface MetricCardData {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  trendIcon?: React.ReactNode;
  footerTitle: string;
  footerDescription: string;
}

interface SectionCardsProps {
  data?: MetricCardData[];
}

export default function SectionCards({ data }: SectionCardsProps) {
  const cards = data ?? [];

  if (cards.length === 0) {
    return (
      <div className="w-full py-8 text-center text-gray-500 text-lg">
        There is no data to render.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-md border-2 border-gray-300 rounded-xl p-4 relative"
        >
          <div className="mb-2 text-sm text-gray-500 ">{card.title}</div>
          <div className="text-2xl font-semibold mb-6 text-gray-900 ">
            {card.value}
          </div>
          <div className="absolute top-4 right-4 flex items-center text-xs border px-2 py-1 rounded-lg gap-1 text-gray-700 border-gray-300  bg-white">
            {card.trendIcon}
            {card.trend}
          </div>
          <div className="mt-4 text-sm">
            <div className="flex items-center gap-2 font-medium text-gray-800 ">
              {card.footerTitle}{" "}
              {card.trendDirection === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="text-gray-500 ">{card.footerDescription}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
