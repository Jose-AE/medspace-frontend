import React from "react";

interface Props {
  description: string;
  size: number;
}

export default function DescriptionSection({ description, size }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
      <p className="text-gray-800 mb-2">
        {description ||
          `
            ¿Buscas un consultorio médico listo para operar? Rentamos espacios
        totalmente amueblados en nuestra clínica ubicada en Lomas Virreyes, con
        todos los servicios incluidos. 
        `}
      </p>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Size (in sq m)</h2>
      <p className="text-gray-800 mb-2">{size}</p>
    </div>
  );
}
