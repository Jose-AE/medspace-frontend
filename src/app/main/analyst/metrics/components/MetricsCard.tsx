export interface MetricCardData {
  title: string;
  value: string;
  city?: string;
  category?: string;
}

interface SectionCardsProps {
  data: MetricCardData[];
}

export default function SectionCards({ data }: SectionCardsProps) {
  if (data.length === 0) {
    return (
      <div className="w-full py-8 text-center text-gray-500 text-lg">
        There is no data to render.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
      {data.map((card, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-md border-2 border-gray-300 rounded-xl p-4 relative"
        >
          <div className="mb-2 text-sm text-gray-500">{card.title}</div>
          <div className="text-2xl font-semibold mb-6 text-gray-900">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
