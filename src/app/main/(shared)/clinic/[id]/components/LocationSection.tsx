"use client";

import React from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { FaHouseChimneyMedical } from "react-icons/fa6";

interface Props {
  locationName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const DEFAULT_COORDINATES = {
  longitude: -99.132390928256,
  latitude: 19.43121854346279
};

export default function LocationSection({ coordinates, locationName }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Location</h2>
      <p className="text-gray-800 mb-2">{locationName}</p>
      <div className="h-64 bg-gray-200 mb-2 rounded-lg relative overflow-hidden">
        <Map
          initialViewState={{
            longitude: coordinates.longitude || DEFAULT_COORDINATES.longitude,
            latitude: coordinates.latitude || DEFAULT_COORDINATES.latitude,
            zoom: 16
          }}
          dragRotate={false}
          mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=a8to16zNmdlTpc9ywU87"
        >
          <Marker
            longitude={coordinates.longitude || DEFAULT_COORDINATES.longitude}
            latitude={coordinates.latitude || DEFAULT_COORDINATES.latitude}
            anchor="bottom"
          >
            <FaHouseChimneyMedical
              className="text-white bg-primary rounded-full p-2 shadow-md"
              size={40}
            />
          </Marker>
        </Map>
      </div>
    </div>
  );
}
