'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Button from '@/components/Button';

interface DiseaseData {
  season: string;
  disease: string;
  cases: number;
}

interface ComparisonChartProps {
  data: DiseaseData[];
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  barColor: string;
  diseases: string[];
  maxValue: number;
  yAxisStep: number;
  title?: string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  selectedSeason,
  onSeasonChange,
  barColor,
  diseases,
  maxValue,
  yAxisStep,
  title,
  margin = { top: 20, right: 30, bottom: 50, left: 30 },
}) => {
  const filteredData = diseases.map((disease) => {
    const diseaseEntry = data.find(
      (entry) =>
        entry.season === selectedSeason && entry.disease === disease
    );
    return {
      name: disease,
      cases: diseaseEntry ? diseaseEntry.cases : 0,
    };
  });

  return (
    <div className="p-4">
      {title && (
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
      )}

      {/* Temporadas */}
      <div className="flex justify-center gap-2 mb-4">
        {seasons.map((season) => (
          <Button
            key={season}
            variant={selectedSeason === season ? 'primary' : 'outline'}
            onClick={() => onSeasonChange(season)}
          >
            {season}
          </Button>
        ))}
      </div>

      {/* Gráfica */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={filteredData}
          margin={margin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxValue]} tickCount={Math.floor(maxValue / yAxisStep) + 1} />
          <Tooltip />
          <Bar dataKey="cases" fill={barColor} />
        </BarChart>
      </ResponsiveContainer>

      {/* Etiqueta */}
      <p className="text-sm text-center mt-2 text-muted-foreground">cases</p>
    </div>
  );
};

export default ComparisonChart;
